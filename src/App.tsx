import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/initialData';
import { PortfolioData, Project, BlogPost } from './types';
import { useTheme } from './lib/theme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { EnterpriseCapabilities } from './components/EnterpriseCapabilities';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { BlogDetailModal } from './components/BlogDetailModal';
import { AdminModal } from './components/AdminModal';
import { AiChatWidget } from './components/AiChatWidget';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Core portfolio state initialized with instant fallback data
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState(true);

  // Selected modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Admin Modal & Auth
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  });

  // AI Assistant Chatbot
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Contact preset when user clicks a service
  const [contactServicePreset, setContactServicePreset] = useState<string | undefined>(undefined);

  // Fetch latest data from server
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.projects) {
            setPortfolio(data);
          }
        }
      } catch (err) {
        console.warn('Using local fallback portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  // Check stored admin token validity
  useEffect(() => {
    if (adminToken) {
      fetch('/api/admin/check', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then((res) => {
          if (!res.ok) {
            setAdminToken(null);
            localStorage.removeItem('admin_token');
          }
        })
        .catch(() => {
          // Keep token if offline
        });
    }
  }, [adminToken]);

  const handleAdminLoginSuccess = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('admin_token', token);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('admin_token');
  };

  const handleSelectServicePreset = (serviceName: string) => {
    setContactServicePreset(serviceName);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400 font-sans">
      {/* Top sticky navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={!!adminToken}
        name={portfolio.profile.name}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero
          profile={portfolio.profile}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        <About profile={portfolio.profile} />

        <Services
          services={portfolio.services}
          onSelectService={handleSelectServicePreset}
        />

        <EnterpriseCapabilities />

        <Projects
          projects={portfolio.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        <Experience experience={portfolio.experience} />

        <Skills
          skills={portfolio.skills}
          certifications={portfolio.certifications}
        />

        <Blog
          blogs={portfolio.blogs}
          onSelectBlog={(b) => setSelectedBlog(b)}
        />

        <Contact
          profile={portfolio.profile}
          selectedServicePreset={contactServicePreset}
        />
      </main>

      {/* Footer */}
      <Footer profile={portfolio.profile} />

      {/* Floating AI Assistant Chatbot */}
      <AiChatWidget
        isOpen={isAiChatOpen}
        onOpen={() => setIsAiChatOpen(true)}
        onClose={() => setIsAiChatOpen(false)}
        name={portfolio.profile.name}
        email={portfolio.profile.email}
      />

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Blog Article Reader Modal */}
      <BlogDetailModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        portfolio={portfolio}
        onPortfolioUpdate={(updated) => setPortfolio(updated)}
        isAdminLoggedIn={!!adminToken}
        onAdminLoginSuccess={handleAdminLoginSuccess}
        onAdminLogout={handleAdminLogout}
        adminToken={adminToken}
      />
    </div>
  );
}
