import React from 'react';
import { Globe, Cpu, Smartphone, Check, ArrowRight, Layers, Bot, Zap, Apple, Compass } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceCategory: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  return (
    <section
      id="services"
      className="py-20 md:py-28"
      aria-label="Core Services & Technical Expertise"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Specialized Engineering Services
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Focused, high-impact technical development tailored for high-growth businesses, venture-backed startups, and modern enterprises.
          </p>
        </div>

        {/* 3 Specific Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Website Development (Accent: Blue) */}
          <div
            id="service-card-web"
            className="group relative rounded-2xl bg-white dark:bg-slate-800/90 border-2 border-blue-200/80 dark:border-blue-900/60 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-6">
              {/* Header with Icon and Accent Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/80">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Web Architecture
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Website Development
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  High-Performance Business & Industry Platforms
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Crafting lightning-fast modern websites and complex SaaS portals with Next.js, semantic SEO, sub-second paints, and WCAG AA accessibility.
                </p>
              </div>

              {/* Deliverable Items */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  Key Deliverables
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Next.js / React server-side & client-side architectures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>95+ Core Web Vitals, dynamic OpenGraph, structured JSON-LD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Headless CMS / e-commerce integration (Stripe, Shopify)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Robust cross-browser QA & responsive fluid scaling</span>
                  </li>
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind', 'PostgreSQL'].map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60">
              <a
                href="#contact"
                onClick={() => onSelectService('Website Development')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-blue-200 dark:border-blue-800 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Request Web Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 2: AI Integration (Accent: Emerald) */}
          <div
            id="service-card-ai"
            className="group relative rounded-2xl bg-white dark:bg-slate-800/90 border-2 border-emerald-300/80 dark:border-emerald-700/60 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-6">
              {/* Header with Icon and Accent Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                  AI Integration
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  AI Integration & Automation
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  Chatbots, RAG Pipelines & Manual Complexity Reduction
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Transforming manual, repetitive back-office operations into reliable agentic workflows. Custom enterprise chatbots with source citations, document OCR parsing, and CRM auto-sync.
                </p>
              </div>

              {/* Deliverable Items */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  Key Deliverables
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>Domain-grounded RAG chatbots with strict accuracy guardrails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>Autonomous document classification & structured invoice OCR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>Automated multi-step event triggers via n8n & custom Node microservices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>Latency streaming, token cost budgeting & telemetry logs</span>
                  </li>
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Gemini 2.5', 'Claude API', 'LangChain', 'Vector DB', 'n8n', 'Node.js'].map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60">
              <a
                href="#contact"
                onClick={() => onSelectService('AI Integration & Automation')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white border border-emerald-200 dark:border-emerald-800 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Automate Your Workflow</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 3: Mobile App Development (Accent: Blue with iOS & Android Icons) */}
          <div
            id="service-card-mobile"
            className="group relative rounded-2xl bg-white dark:bg-slate-800/90 border-2 border-blue-200/80 dark:border-blue-900/60 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-6">
              {/* Header with Icon and Platform Badges */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/80">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 text-[11px] font-bold border border-slate-200 dark:border-slate-600">
                  <Apple className="w-3 h-3 text-slate-700 dark:text-slate-200" />
                  <span>iOS</span>
                  <span className="text-slate-400">•</span>
                  <span>Android</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Mobile App Development
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  React Native Cross-Platform Engineering
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Single codebase, genuine native feel. Fluid 60fps animations, biometric authentication, offline-first SQLite caches, and frictionless App Store submission.
                </p>
              </div>

              {/* Deliverable Items */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  Key Deliverables
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Single React Native codebase for Apple iOS and Google Android</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Offline-first persistence with SQLite / WatermelonDB sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Native modules (HealthKit, Biometrics, Push Notifications)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>Automated Fastlane & EAS App Store deployment</span>
                  </li>
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['React Native', 'Expo', 'TypeScript', 'Zustand', 'SQLite', 'Fastlane'].map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60">
              <a
                href="#contact"
                onClick={() => onSelectService('Mobile App Development')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-blue-200 dark:border-blue-800 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Launch Mobile Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
