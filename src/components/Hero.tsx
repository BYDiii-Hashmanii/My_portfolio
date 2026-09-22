import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Twitter, Mail, CheckCircle2, Terminal, Sparkles, Code2, Cpu, Smartphone, MapPin } from 'lucide-react';
import { ProfileInfo } from '../types';

interface HeroProps {
  profile: ProfileInfo;
  onOpenAiChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenAiChat }) => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      aria-label="Introduction Hero"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status & Location Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Open for International Engagements</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Name and Professional Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {profile.name}
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 tracking-tight">
                {profile.roleSubtitle}
              </p>
            </div>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              {profile.valueProposition}
            </p>

            {/* Quick Specialization Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Enterprise Web Platforms
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Autonomous AI Workflows
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60">
                <Smartphone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Cross-Platform Mobile Apps
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                id="hero-view-work-cta"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Solutions & Case Studies</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                id="hero-contact-cta"
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Discovery Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenAiChat}
                id="hero-ask-ai-cta"
                className="px-4 py-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                title="Test live AI integration"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>AI Solutions Advisor</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">Connect</span>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                id="hero-github-link"
                className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                id="hero-linkedin-link"
                className="p-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                id="hero-twitter-link"
                className="p-2 rounded-lg hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                id="hero-email-link"
                className="p-2 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={`Email ${profile.name}`}
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Code Card & Visual System Specs */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-2xl text-slate-300 font-mono text-xs">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  solutions-partner.config.ts
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-sm border border-emerald-800/60">
                  ENTERPRISE READY
                </span>
              </div>

              {/* Code Snippet */}
              <div className="space-y-2 leading-relaxed font-mono">
                <p className="text-slate-500">// Enterprise Digital Engineering Practice</p>
                <p>
                  <span className="text-purple-400">export const</span>{' '}
                  <span className="text-blue-300">solutionsPractice</span>:{' '}
                  <span className="text-amber-300">EnterprisePartner</span> = &#123;
                </p>
                <div className="pl-4 space-y-1">
                  <p>
                    <span className="text-slate-400">leadArchitect:</span>{' '}
                    <span className="text-emerald-300">"{profile.name}"</span>,
                  </p>
                  <p>
                    <span className="text-slate-400">marketCoverage:</span>{' '}
                    <span className="text-emerald-300">"International & Remote-First"</span>,
                  </p>
                  <p>
                    <span className="text-slate-400">solutions:</span> [
                  </p>
                  <p className="pl-4 text-blue-300">
                    "High-Conversion Web Architecture",
                  </p>
                  <p className="pl-4 text-emerald-300">
                    "Autonomous AI & LLM Workflows",
                  </p>
                  <p className="pl-4 text-indigo-300">
                    "Cross-Platform Mobile Apps"
                  </p>
                  <p>],</p>
                  <p>
                    <span className="text-slate-400">serviceLevelMetrics:</span> &#123;
                  </p>
                  <p className="pl-4 text-slate-300">
                    yearsTrackRecord: <span className="text-amber-400">{profile.yearsExperience}</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    hoursAutomated: <span className="text-amber-400">{profile.hoursAutomated}</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    clientSatisfaction: <span className="text-emerald-400">99%</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    slaCoverage: <span className="text-emerald-400">"Global / 24h Turnaround"</span>
                  </p>
                  <p>&#125;,</p>
                  <p>
                    <span className="text-slate-400">availability:</span>{' '}
                    <span className="text-emerald-400">"Accepting International Contracts"</span>
                  </p>
                </div>
                <p>&#125;;</p>
              </div>

              {/* Verified pill */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>TypeScript 5.x • Strict Type Checked</span>
                </div>
                <span className="text-slate-500">v2.4.0</span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                <div className="text-xl font-bold text-slate-900 dark:text-white">{profile.yearsExperience}+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Years Experience</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{profile.completedProjects}+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Completed Projects</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">12.5k+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Hours Automated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
