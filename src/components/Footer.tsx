import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, ShieldCheck, Heart } from 'lucide-react';
import { ProfileInfo } from '../types';

interface FooterProps {
  profile: ProfileInfo;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {profile.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-white font-bold text-sm tracking-tight">{profile.name} Solutions</span>
            </div>
            <p className="text-slate-400 text-xs">
              Enterprise Web Platforms • Autonomous AI Workflows • Cross-Platform Mobile Solutions
            </p>
          </div>

          {/* Nav quick links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About Practice</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#enterprise-solutions" className="hover:text-white transition-colors">Global Solutions</a>
            <a href="#projects" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#experience" className="hover:text-white transition-colors">Track Record</a>
            <a href="#skills" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#blog" className="hover:text-white transition-colors">Insights</a>
            <a href="#contact" className="hover:text-white transition-colors">Consultation</a>
            <a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">Sitemap</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-blue-600 transition-colors cursor-pointer"
              title="Back to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved. Engineered with TypeScript & Tailwind.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-sm border border-emerald-900/60">
              <ShieldCheck className="w-3 h-3" />
              Plausible Analytics: 100% Cookieless
            </span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
