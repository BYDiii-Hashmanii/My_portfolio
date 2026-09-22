import React, { useState, useEffect } from 'react';
import {
  X, Lock, LogOut, Check, Plus, Trash2, Edit2, Mail, Eye, Key,
  FolderGit2, BookOpen, Award, MessageSquare, AlertCircle, RefreshCw,
  ExternalLink, Sparkles, CheckCircle2
} from 'lucide-react';
import { PortfolioData, Project, BlogPost, Skill, Certification, ContactSubmission } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  onPortfolioUpdate: (updated: PortfolioData) => void;
  isAdminLoggedIn: boolean;
  onAdminLoginSuccess: (token: string) => void;
  onAdminLogout: () => void;
  adminToken: string | null;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onPortfolioUpdate,
  isAdminLoggedIn,
  onAdminLoginSuccess,
  onAdminLogout,
  adminToken
}) => {
  // Login State
  const [email, setEmail] = useState('admin@portfolio.dev');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blogs' | 'skills' | 'inbox'>('overview');

  // Submissions State
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // CRUD Editing States
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch submissions when logged in & on inbox tab
  useEffect(() => {
    if (isAdminLoggedIn && adminToken && (activeTab === 'inbox' || activeTab === 'overview')) {
      fetchSubmissions();
    }
  }, [isAdminLoggedIn, adminToken, activeTab]);

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Failed to fetch submissions', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        onAdminLoginSuccess(data.token);
        showNotification('Logged in successfully as Administrator.');
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error during login.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // -------------------------------------------------------------
  // Project CRUD
  // -------------------------------------------------------------
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    try {
      const isNew = !editingProject.id;
      const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${editingProject.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...editingProject,
          category: editingProject.category || 'Web',
          techStack: Array.isArray(editingProject.techStack) ? editingProject.techStack : ((editingProject.techStack as any) || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          results: Array.isArray(editingProject.results) ? editingProject.results : ((editingProject.results as any) || '').split('\n').map((s: string) => s.trim()).filter(Boolean),
          imageUrl: editingProject.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
          createdAt: editingProject.createdAt || new Date().toISOString().split('T')[0]
        })
      });

      if (res.ok) {
        const data = await res.json();
        let updatedProjects = [...portfolio.projects];
        if (isNew) {
          updatedProjects.unshift(data.project);
        } else {
          updatedProjects = updatedProjects.map(p => p.id === data.project.id ? data.project : p);
        }
        onPortfolioUpdate({ ...portfolio, projects: updatedProjects });
        setEditingProject(null);
        showNotification(isNew ? 'Project created successfully!' : 'Project updated successfully!');
      }
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const updatedProjects = portfolio.projects.filter(p => p.id !== id);
        onPortfolioUpdate({ ...portfolio, projects: updatedProjects });
        showNotification('Project removed.');
      }
    } catch (err) {
      alert('Error deleting project');
    }
  };

  // -------------------------------------------------------------
  // Blog CRUD
  // -------------------------------------------------------------
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title) return;

    try {
      const isNew = !editingBlog.id;
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${editingBlog.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...editingBlog,
          slug: editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: editingBlog.category || 'AI Integration',
          tags: Array.isArray(editingBlog.tags) ? editingBlog.tags : ((editingBlog.tags as any) || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          readTime: editingBlog.readTime || '5 min read',
          publishedAt: editingBlog.publishedAt || new Date().toISOString().split('T')[0],
          coverImage: editingBlog.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
          author: editingBlog.author || portfolio.profile.name,
          published: true
        })
      });

      if (res.ok) {
        const data = await res.json();
        let updatedBlogs = [...portfolio.blogs];
        if (isNew) {
          updatedBlogs.unshift(data.blog);
        } else {
          updatedBlogs = updatedBlogs.map(b => b.id === data.blog.id ? data.blog : b);
        }
        onPortfolioUpdate({ ...portfolio, blogs: updatedBlogs });
        setEditingBlog(null);
        showNotification(isNew ? 'Blog post published!' : 'Blog post updated!');
      }
    } catch (err) {
      alert('Error saving blog');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const updatedBlogs = portfolio.blogs.filter(b => b.id !== id);
        onPortfolioUpdate({ ...portfolio, blogs: updatedBlogs });
        showNotification('Article removed.');
      }
    } catch (err) {
      alert('Error deleting blog post');
    }
  };

  // -------------------------------------------------------------
  // Skills & Certifications CRUD
  // -------------------------------------------------------------
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...editingSkill,
          category: editingSkill.category || 'Frontend',
          proficiency: Number(editingSkill.proficiency) || 90,
          years: Number(editingSkill.years) || 5
        })
      });

      if (res.ok) {
        const data = await res.json();
        const updatedSkills = [...portfolio.skills, data.skill];
        onPortfolioUpdate({ ...portfolio, skills: updatedSkills });
        setEditingSkill(null);
        showNotification('Skill added successfully!');
      }
    } catch (err) {
      alert('Error saving skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const updatedSkills = portfolio.skills.filter(s => s.id !== id);
        onPortfolioUpdate({ ...portfolio, skills: updatedSkills });
        showNotification('Skill removed.');
      }
    } catch (err) {
      alert('Error deleting skill');
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title) return;

    try {
      const res = await fetch('/api/admin/certifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...editingCert,
          issuer: editingCert.issuer || 'Official Issuer',
          issueDate: editingCert.issueDate || 'Issued 2026',
          credentialUrl: editingCert.credentialUrl || '#'
        })
      });

      if (res.ok) {
        const data = await res.json();
        const updatedCerts = [...portfolio.certifications, data.certification];
        onPortfolioUpdate({ ...portfolio, certifications: updatedCerts });
        setEditingCert(null);
        showNotification('Certification registered!');
      }
    } catch (err) {
      alert('Error saving certification');
    }
  };

  const handleDeleteCert = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/certifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const updatedCerts = portfolio.certifications.filter(c => c.id !== id);
        onPortfolioUpdate({ ...portfolio, certifications: updatedCerts });
        showNotification('Certification removed.');
      }
    } catch (err) {
      alert('Error deleting cert');
    }
  };

  // -------------------------------------------------------------
  // Submissions Inbox Actions
  // -------------------------------------------------------------
  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, read: true } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        showNotification('Message deleted.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-dashboard-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification */}
        {notification && (
          <div className="absolute top-4 right-4 z-50 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 id="admin-dashboard-title" className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Admin Content Management
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAdminLoggedIn ? 'Authenticated Session • Full CRUD Permissions' : 'Secure Private Gateway'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={onAdminLogout}
                className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        {!isAdminLoggedIn ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-900">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Authentication</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log in to edit projects, publish articles, update skills, and view contact submissions.
              </p>
            </div>

            {/* Helper callout with prefilled credentials */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/70 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Default Demo Credentials</span>
              </div>
              <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                Email: <strong>admin@portfolio.dev</strong><br />
                Password: <strong>admin123</strong>
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer disabled:opacity-60"
              >
                {isLoggingIn ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 p-4 bg-slate-50 dark:bg-slate-950 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 space-y-1 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Overview & Metrics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projects</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {portfolio.projects.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('blogs')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'blogs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Articles</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {portfolio.blogs.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('skills')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Skills & Certs</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {portfolio.skills.length + portfolio.certifications.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inbox')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'inbox'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Inbox</span>
                </div>
                {submissions.filter(s => !s.read).length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                    {submissions.filter(s => !s.read).length} new
                  </span>
                )}
              </button>
            </div>

            {/* Main Tab Panels */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[75vh]">
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Portfolio Analytics & Quick Management
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Total Projects</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{portfolio.projects.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Published Blogs</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{portfolio.blogs.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Active Skills</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{portfolio.skills.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Inquiries Received</p>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{submissions.length}</p>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Direct Actions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject({
                            title: '',
                            category: 'Web',
                            tagline: '',
                            description: '',
                            problem: '',
                            solution: '',
                            techStack: ['Next.js', 'TypeScript', 'Tailwind'],
                            results: ['99+ Lighthouse score'],
                            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
                            featured: false
                          });
                          setActiveTab('projects');
                        }}
                        className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingBlog({
                            title: '',
                            slug: '',
                            excerpt: '',
                            content: '',
                            category: 'AI Integration',
                            tags: ['AI', 'Engineering'],
                            readTime: '4 min read',
                            author: portfolio.profile.name
                          });
                          setActiveTab('blogs');
                        }}
                        className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Write Blog Post</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Manage Projects & Case Studies</h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject({
                        title: '',
                        category: 'Web',
                        tagline: '',
                        description: '',
                        problem: '',
                        solution: '',
                        techStack: ['Next.js', 'TypeScript'],
                        results: ['Significant operational efficiency'],
                        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
                        featured: false
                      })}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Project</span>
                    </button>
                  </div>

                  {editingProject && (
                    <form onSubmit={handleSaveProject} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {editingProject.id ? 'Edit Project' : 'Create New Project'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium">Project Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium">Category</label>
                          <select
                            value={editingProject.category || 'Web'}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          >
                            <option value="Web">Website Development</option>
                            <option value="AI">AI Integration</option>
                            <option value="Mobile">Mobile (React Native)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium">Tagline</label>
                        <input
                          type="text"
                          value={editingProject.tagline || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-rose-600 dark:text-rose-400">The Problem</label>
                          <textarea
                            rows={3}
                            value={editingProject.problem || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium text-emerald-600 dark:text-emerald-400">The Solution</label>
                          <textarea
                            rows={3}
                            value={editingProject.solution || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingProject.techStack) ? editingProject.techStack.join(', ') : editingProject.techStack || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value as any })}
                          placeholder="Next.js, TypeScript, Tailwind"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium">Measurable Results (one per line)</label>
                        <textarea
                          rows={2}
                          value={Array.isArray(editingProject.results) ? editingProject.results.join('\n') : editingProject.results || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value as any })}
                          placeholder="82% reduction in support response times"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs rounded-lg bg-blue-600 text-white font-semibold cursor-pointer"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Project List */}
                  <div className="space-y-3">
                    {portfolio.projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{p.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{p.tagline}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(p)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BLOGS TAB */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Manage Blog Articles</h3>
                    <button
                      type="button"
                      onClick={() => setEditingBlog({
                        title: '',
                        slug: '',
                        excerpt: '',
                        content: '',
                        category: 'AI Integration',
                        tags: ['AI', 'Architecture'],
                        readTime: '5 min read',
                        author: portfolio.profile.name
                      })}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Post</span>
                    </button>
                  </div>

                  {editingBlog && (
                    <form onSubmit={handleSaveBlog} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {editingBlog.id ? 'Edit Article' : 'Compose New Article'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium">Article Title</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium">Category</label>
                          <input
                            type="text"
                            value={editingBlog.category || 'AI Integration'}
                            onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium">Excerpt</label>
                        <textarea
                          rows={2}
                          value={editingBlog.excerpt || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium">Article Content (Markdown supported)</label>
                        <textarea
                          rows={8}
                          required
                          value={editingBlog.content || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs rounded-lg bg-emerald-600 text-white font-semibold cursor-pointer"
                        >
                          Publish Post
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Blog List */}
                  <div className="space-y-3">
                    {portfolio.blogs.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">{b.title}</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {b.category} • {b.publishedAt} • {b.readTime}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingBlog(b)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-8">
                  {/* Skills Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Technical Skills</h3>
                      <button
                        type="button"
                        onClick={() => setEditingSkill({ name: '', category: 'Frontend', proficiency: 90, years: 4 })}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Skill</span>
                      </button>
                    </div>

                    {editingSkill && (
                      <form onSubmit={handleSaveSkill} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-medium">Skill Name</label>
                            <input
                              type="text"
                              required
                              value={editingSkill.name || ''}
                              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Category</label>
                            <select
                              value={editingSkill.category || 'Frontend'}
                              onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            >
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="AI & Automation">AI & Automation</option>
                              <option value="Mobile">Mobile</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-medium">Proficiency (0-100)%</label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={editingSkill.proficiency || 90}
                              onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingSkill(null)}
                            className="px-3 py-1 text-xs rounded-lg border cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1 text-xs rounded-lg bg-emerald-600 text-white font-semibold cursor-pointer"
                          >
                            Save Skill
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {portfolio.skills.map((s) => (
                        <div key={s.id} className="p-3 rounded-lg bg-white dark:bg-slate-800 border flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold">{s.name}</span>
                            <span className="ml-2 text-[10px] text-slate-400">({s.category} • {s.proficiency}%)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(s.id)}
                            className="text-slate-400 hover:text-rose-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Section */}
                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Certifications</h3>
                      <button
                        type="button"
                        onClick={() => setEditingCert({ title: '', issuer: '', issueDate: 'Issued 2026', credentialUrl: '#' })}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Certification</span>
                      </button>
                    </div>

                    {editingCert && (
                      <form onSubmit={handleSaveCert} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium">Certification Title</label>
                            <input
                              type="text"
                              required
                              value={editingCert.title || ''}
                              onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Issuer</label>
                            <input
                              type="text"
                              required
                              value={editingCert.issuer || ''}
                              onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Credential URL</label>
                            <input
                              type="text"
                              value={editingCert.credentialUrl || ''}
                              onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Issue Date</label>
                            <input
                              type="text"
                              value={editingCert.issueDate || ''}
                              onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingCert(null)}
                            className="px-3 py-1 text-xs rounded-lg border cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1 text-xs rounded-lg bg-blue-600 text-white font-semibold cursor-pointer"
                          >
                            Save Cert
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="space-y-2">
                      {portfolio.certifications.map((c) => (
                        <div key={c.id} className="p-3 rounded-lg bg-white dark:bg-slate-800 border flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold">{c.title}</span>
                            <span className="ml-2 text-slate-400">by {c.issuer}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteCert(c.id)}
                            className="text-slate-400 hover:text-rose-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* INBOX TAB */}
              {activeTab === 'inbox' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Contact Inquiries</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Messages submitted through the portfolio contact form.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={fetchSubmissions}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1 cursor-pointer"
                      title="Refresh"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingSubmissions ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  {submissions.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No contact submissions yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className={`p-4 rounded-xl border transition-colors ${
                            sub.read
                              ? 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
                              : 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                  {sub.name}
                                </span>
                                {!sub.read && (
                                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-600 text-white">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <a
                                href={`mailto:${sub.email}`}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-mono"
                              >
                                {sub.email}
                              </a>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <span>{new Date(sub.receivedAt).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="py-2">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                              Subject: {sub.subject}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-wrap leading-relaxed">
                              {sub.message}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end gap-2">
                            {!sub.read && (
                              <button
                                type="button"
                                onClick={() => handleMarkRead(sub.id)}
                                className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
                              >
                                Mark as Read
                              </button>
                            )}

                            <a
                              href={`mailto:${sub.email}?subject=Re: ${encodeURIComponent(sub.subject)}`}
                              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1 cursor-pointer"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Reply via Email</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-500 cursor-pointer"
                              title="Delete Submission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
