import React, { useState, useEffect } from 'react';
import { Sun, Moon, Lock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { ThemeMode } from '../lib/theme';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  name?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenAdmin,
  isAdminLoggedIn,
  name = 'Obaid'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'OB';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'services', 'solutions', 'projects', 'experience', 'skills', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Solutions', href: '#enterprise-solutions' },
    { label: 'Case Studies', href: '#projects' },
    { label: 'Track Record', href: '#experience' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'Insights', href: '#blog' },
    { label: 'Consultation', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          id="nav-logo-link"
          className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            {initials}
          </div>
          <div>
            <div className="font-bold text-base text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {name}
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for enterprise projects"></span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Digital Solutions & AI</p>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            id="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer"
          >
            {theme === 'light' ? (
              <Moon className="w-4.5 h-4.5 transition-transform duration-200 hover:rotate-12" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            )}
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            type="button"
            onClick={onOpenAdmin}
            id="admin-login-nav-btn"
            aria-label="Admin Dashboard"
            className={`h-10 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isAdminLoggedIn
                ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? 'Admin Panel' : 'Admin'}</span>
          </button>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            id="nav-hire-me-cta"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-xs hover:shadow-md transition-all duration-200"
          >
            <span>Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            aria-label="Toggle mobile menu"
            className="md:hidden w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-xl bg-blue-600 text-white font-medium text-sm shadow-xs"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
