import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  getDatabase,
  saveDatabase,
  createSessionToken,
  verifySessionToken,
  checkAdminCredentials
} from './server/db';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !verifySessionToken(token)) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }
  next();
}

// -------------------------------------------------------------
// SEO Endpoints: robots.txt & sitemap.xml
// -------------------------------------------------------------
app.get('/robots.txt', (req, res) => {
  const host = req.get('host') || 'portfolio.dev';
  const protocol = req.protocol || 'https';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: ${protocol}://${host}/sitemap.xml
`);
});

app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host') || 'portfolio.dev';
  const protocol = req.protocol || 'https';
  const baseUrl = `${protocol}://${host}`;
  const db = getDatabase();
  const currentDate = new Date().toISOString().split('T')[0];

  const blogUrls = db.portfolio.blogs.map(b => `
  <url>
    <loc>${baseUrl}/#blog-${b.slug}</loc>
    <lastmod>${b.publishedAt || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const projectUrls = db.portfolio.projects.map(p => `
  <url>
    <loc>${baseUrl}/#project-${p.id}</loc>
    <lastmod>${p.createdAt || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#experience</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#skills</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>${projectUrls}${blogUrls}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

// -------------------------------------------------------------
// Public API Endpoints
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/portfolio', (req, res) => {
  const db = getDatabase();
  res.json(db.portfolio);
});

// Contact Form submission with spam honeypot
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, _gotcha } = req.body;

  // Spam protection: Honeypot field must be empty
  if (_gotcha && _gotcha.trim() !== '') {
    // Silently succeed to mislead spam bot
    return res.json({ success: true, message: 'Message received.' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const db = getDatabase();
  const submission = {
    id: 'sub-' + crypto.randomUUID().slice(0, 8),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
    read: false
  };

  db.contactSubmissions.unshift(submission);
  saveDatabase(db);

  return res.json({
    success: true,
    message: 'Thank you! Your message has been received. I typically respond within 24 hours.'
  });
});

// AI Assistant Chatbot API (Server-side Gemini Integration)
app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message string is required' });
  }

  const db = getDatabase();
  const portfolio = db.portfolio;

  const systemContext = `You are the AI Solutions Advisor for Obaid Solutions, a specialized technology practice providing digital engineering and AI solutions to international businesses and enterprises, headquartered in Islamabad, Pakistan with worldwide remote delivery.
We deliver commercial solutions across three core pillars:
1. Enterprise Website Architecture & Digital Platforms: Ultra-fast web portals, Next.js, React, TypeScript, high-conversion architectures, 95+ Core Web Vitals, and localized multi-currency portals. Flagship solutions include a high-converting Property Dealer & Real Estate Portal with CRM automation, and a modern Dental Clinic & Healthcare Booking System.
2. Enterprise AI Integration & Workflow Automation: Production-grade autonomous LLM agents, retrieval-augmented generation (RAG) knowledge systems, document OCR/invoice processing, and ERP/CRM workflow automation reducing manual labor and operational overhead for global businesses.
3. Cross-Platform Mobile Engineering: React Native iOS & Android applications with offline-first synchronization (SQLite/WatermelonDB), native device bridging, and high-performance UX for international audiences.

Key Practice Metrics:
- Location: Islamabad, Pakistan (Full global remote delivery across US, UK, UAE, Canada, Australia, and Singapore time-zones).
- Track Record: 3+ years of professional engineering leadership, 35+ delivered enterprise projects, 99% client satisfaction rate, and 12,500+ hours of operational friction automated.
- Solutions & Case Studies: Enterprise Property Dealer Portal, Dental Clinic Healthcare System, OmniFlow AI (customer support co-pilot with 82% ticket resolution), PulseFit (offline-first mobile platform with 85k active users), DocuMind (invoice OCR & ledger synchronization), NovaPay (international fintech wallet).
- Engagement Models: Turnkey product execution, dedicated engineering pod extension, technical audits, and international contracts.
- Contact: obaidr047@gmail.com.

Guidelines:
- Speak in a consultative, authoritative, helpful, and professional tone representing an international technology solutions partner.
- Focus on business ROI, operational efficiency, architectural scalability, and solving international business bottlenecks.
- Never portray the organization as an individual looking for a traditional employment job; position as a solutions provider delivering services to businesses.
- Invite prospective business clients to book a discovery call or submit their project scope via the Consultation form or direct email at obaidr047@gmail.com.
- Keep responses within 2-3 focused, structured paragraphs or clear bullet points.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Try primary model, followed by lightweight/latest fallbacks if high demand occurs (e.g. 503)
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      let generatedReply: string | null = null;

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: `User Question: ${message}`,
            config: {
              systemInstruction: systemContext,
            },
          });

          if (response && response.text) {
            generatedReply = response.text;
            break;
          }
        } catch (modelErr: any) {
          const statusCode = modelErr?.status || modelErr?.statusCode || modelErr?.error?.code;
          console.warn(`Gemini model ${model} temporarily unavailable (Status: ${statusCode || 'unknown'}). Trying next fallback model...`);
        }
      }

      if (generatedReply) {
        return res.json({ reply: generatedReply });
      }
    }
  } catch (err: any) {
    console.warn('Gemini models unavailable, proceeding with intelligent contextual fallback response:', err?.message || err);
  }

  // Graceful fallback response if API key is not configured or in offline preview
  const q = message.toLowerCase();
  let fallbackReply = `Hello! I am the AI Solutions Advisor for Obaid Solutions. `;

  if (q.includes('rate') || q.includes('cost') || q.includes('price') || q.includes('hire') || q.includes('available') || q.includes('engagement') || q.includes('contract')) {
    fallbackReply += `We engage with international businesses and enterprises through flexible models including turnkey solution delivery, dedicated engineering sprints, and technical advisory under standard Master Services Agreements (MSA). Project engagements are structured around clear deliverables and ROI targets. You can initiate a consultation using the form below or contact us directly at obaidr047@gmail.com for a formal discovery session.`;
  } else if (q.includes('property') || q.includes('real estate') || q.includes('dental') || q.includes('clinic')) {
    fallbackReply += `We have delivered commercial platforms tailored for industry leaders: an enterprise Property Dealer Portal (with multi-currency filters, mortgage calculators, and automated CRM lead routing) and a modern Dental Clinic & Patient Booking System (featuring HIPAA/GDPR-compliant scheduling and interactive treatment guides). Explore the full case studies in the Case Studies section!`;
  } else if (q.includes('ai') || q.includes('chatbot') || q.includes('automation') || q.includes('rag') || q.includes('agent')) {
    fallbackReply += `Our AI solutions practice engineers production-ready autonomous workflows: RAG knowledge copilots with grounded citations, OCR document ingestion pipelines, and multi-agent system integrations that systematically eliminate operational friction for international companies. Check out our OmniFlow AI and DocuMind enterprise implementations!`;
  } else if (q.includes('mobile') || q.includes('react native') || q.includes('ios') || q.includes('android')) {
    fallbackReply += `Our mobile practice specializes in enterprise-grade cross-platform applications built with React Native and Expo. We architect offline-first synchronization with SQLite and high-fidelity native bridging, as demonstrated in our PulseFit (85k+ active global users) and NovaPay fintech platforms.`;
  } else if (q.includes('stack') || q.includes('skill') || q.includes('tech') || q.includes('experience') || q.includes('years') || q.includes('location')) {
    fallbackReply += `Our practice is led by Obaid from Islamabad, Pakistan, serving clients globally across North America, EMEA, and APAC with 3+ years of enterprise engineering leadership. The core technical stack comprises TypeScript, Next.js, React, React Native, Node.js, PostgreSQL, Tailwind CSS, and enterprise LLM frameworks, adhering strictly to 95+ Core Web Vitals and WCAG AA standards.`;
  } else {
    fallbackReply += `Obaid Solutions is an international digital engineering and AI consultancy delivering web platforms, autonomous AI workflows, and cross-platform mobile apps to solve complex business problems worldwide. Feel free to explore our case studies or reach out via the Consultation form or direct email at obaidr047@gmail.com to schedule a discovery call!`;
  }

  return res.json({ reply: fallbackReply });
});

// -------------------------------------------------------------
// Admin Authentication & Session Check
// -------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  if (checkAdminCredentials(email, password)) {
    const token = createSessionToken(email);
    return res.json({
      success: true,
      token,
      admin: { email }
    });
  }

  return res.status(401).json({ error: 'Invalid admin credentials.' });
});

app.get('/api/admin/check', requireAdmin, (req, res) => {
  res.json({ valid: true });
});

// -------------------------------------------------------------
// Admin Submissions Management
// -------------------------------------------------------------
app.get('/api/admin/submissions', requireAdmin, (req, res) => {
  const db = getDatabase();
  res.json(db.contactSubmissions);
});

app.patch('/api/admin/submissions/:id/read', requireAdmin, (req, res) => {
  const db = getDatabase();
  const sub = db.contactSubmissions.find(s => s.id === req.params.id);
  if (!sub) return res.status(404).json({ error: 'Submission not found' });
  sub.read = true;
  saveDatabase(db);
  res.json({ success: true, submission: sub });
});

app.delete('/api/admin/submissions/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.contactSubmissions.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Submission not found' });
  db.contactSubmissions.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true });
});

// -------------------------------------------------------------
// Admin CRUD: Projects
// -------------------------------------------------------------
app.post('/api/admin/projects', requireAdmin, (req, res) => {
  const db = getDatabase();
  const newProject = {
    ...req.body,
    id: req.body.id || 'proj-' + crypto.randomUUID().slice(0, 8),
    createdAt: req.body.createdAt || new Date().toISOString().split('T')[0]
  };
  db.portfolio.projects.unshift(newProject);
  saveDatabase(db);
  res.json({ success: true, project: newProject });
});

app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.projects.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });
  db.portfolio.projects[index] = { ...db.portfolio.projects[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, project: db.portfolio.projects[index] });
});

app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.projects.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });
  db.portfolio.projects.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true });
});

// -------------------------------------------------------------
// Admin CRUD: Blogs
// -------------------------------------------------------------
app.post('/api/admin/blogs', requireAdmin, (req, res) => {
  const db = getDatabase();
  const newBlog = {
    ...req.body,
    id: req.body.id || 'blog-' + crypto.randomUUID().slice(0, 8),
    publishedAt: req.body.publishedAt || new Date().toISOString().split('T')[0]
  };
  db.portfolio.blogs.unshift(newBlog);
  saveDatabase(db);
  res.json({ success: true, blog: newBlog });
});

app.put('/api/admin/blogs/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.blogs.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Blog not found' });
  db.portfolio.blogs[index] = { ...db.portfolio.blogs[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, blog: db.portfolio.blogs[index] });
});

app.delete('/api/admin/blogs/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.blogs.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Blog not found' });
  db.portfolio.blogs.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true });
});

// -------------------------------------------------------------
// Admin CRUD: Skills & Certifications
// -------------------------------------------------------------
app.post('/api/admin/skills', requireAdmin, (req, res) => {
  const db = getDatabase();
  const newSkill = {
    ...req.body,
    id: req.body.id || 'sk-' + crypto.randomUUID().slice(0, 8)
  };
  db.portfolio.skills.push(newSkill);
  saveDatabase(db);
  res.json({ success: true, skill: newSkill });
});

app.delete('/api/admin/skills/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.skills.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Skill not found' });
  db.portfolio.skills.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true });
});

app.post('/api/admin/certifications', requireAdmin, (req, res) => {
  const db = getDatabase();
  const newCert = {
    ...req.body,
    id: req.body.id || 'cert-' + crypto.randomUUID().slice(0, 8)
  };
  db.portfolio.certifications.push(newCert);
  saveDatabase(db);
  res.json({ success: true, certification: newCert });
});

app.put('/api/admin/certifications/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.certifications.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Certification not found' });
  db.portfolio.certifications[index] = { ...db.portfolio.certifications[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, certification: db.portfolio.certifications[index] });
});

app.delete('/api/admin/certifications/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.certifications.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Certification not found' });
  db.portfolio.certifications.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true });
});

// -------------------------------------------------------------
// Admin CRUD: Experiences
// -------------------------------------------------------------
app.post('/api/admin/experiences', requireAdmin, (req, res) => {
  const db = getDatabase();
  const newExp = {
    ...req.body,
    id: req.body.id || 'exp-' + crypto.randomUUID().slice(0, 8),
    achievements: Array.isArray(req.body.achievements) ? req.body.achievements : [],
    tech: Array.isArray(req.body.tech) ? req.body.tech : []
  };
  db.portfolio.experience.unshift(newExp);
  saveDatabase(db);
  res.json({ success: true, experience: newExp });
});

app.put('/api/admin/experiences/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.experience.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Experience not found' });
  db.portfolio.experience[index] = { ...db.portfolio.experience[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, experience: db.portfolio.experience[index] });
});

app.delete('/api/admin/experiences/:id', requireAdmin, (req, res) => {
  const db = getDatabase();
  const index = db.portfolio.experience.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Experience not found' });
  db.portfolio.experience.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true });
});

// -------------------------------------------------------------
// Admin: Update Profile Information
// -------------------------------------------------------------
app.put('/api/admin/profile', requireAdmin, (req, res) => {
  const db = getDatabase();
  db.portfolio.profile = { ...db.portfolio.profile, ...req.body };
  saveDatabase(db);
  res.json({ success: true, profile: db.portfolio.profile });
});

// -------------------------------------------------------------
// Vite Middleware / Static File Serving
// -------------------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
