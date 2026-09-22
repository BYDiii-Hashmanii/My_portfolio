import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Cpu,
  Globe,
  CheckCircle2,
  ArrowUpRight,
  Code2,
  Smartphone,
  Layers,
  Sparkles,
  Target,
  Clock,
  Compass,
  Zap,
  Mail,
  MapPin,
  Check,
  AlertCircle,
  Search,
  Rocket,
  FileCheck2,
  ArrowRight,
  CheckCheck,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { ProfileInfo } from '../types';

interface AboutProps {
  profile: ProfileInfo;
}

interface DeliveryPhase {
  id: string;
  stepNumber: string;
  name: string;
  duration: string;
  tagline: string;
  icon: React.ElementType;
  badge: string;
  problem: {
    heading: string;
    description: string;
    consequence: string;
  };
  solution: {
    heading: string;
    description: string;
    tactics: string[];
  };
  deliverables: string[];
  riskMitigation: string;
  realWorldExample: string;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  const deliveryPhases: DeliveryPhase[] = [
    {
      id: 'phase-1',
      stepNumber: '01',
      name: 'Operational Audit & Technical Discovery',
      duration: '48 – 72 Hours',
      tagline: 'Deconstruct bottlenecks before writing code',
      icon: Search,
      badge: 'Pre-Engineering Discovery',
      problem: {
        heading: 'Ambiguous Scope & Runaway Engineering Costs',
        description: 'International businesses frequently embark on software builds with vague specifications, unvetted contractor estimates, and hidden architectural bottlenecks that balloon budgets by 40–70%.',
        consequence: 'Wasted capital, months of timeline drift, and platforms that fail to solve the operational bottleneck.'
      },
      solution: {
        heading: 'Root-Cause Audit & Fixed-Scope SOW',
        description: 'We conduct a systematic architectural teardown of your existing workflows, database schemas, and API dependencies to formulate an unambiguous technical roadmap with fixed milestones.',
        tactics: [
          'Deconstruction of manual friction (spreadsheets, fragmented CRMs, slow legacy web engines)',
          'Clear definition of fixed-price milestones with explicit commercial acceptance criteria',
          'Enterprise security, zero-retention AI compliance, and latency benchmarking'
        ]
      },
      deliverables: [
        'Technical Architecture Specification (SRS)',
        'Milestone-Based Statement of Work (SOW)',
        'Risk & ROI Assessment Report'
      ],
      riskMitigation: 'Zero financial commitment beyond the audit until architecture, pricing, and timeline are mutually approved.',
      realWorldExample: 'Example: Auditing a property agency’s manual WhatsApp lead flow and defining an automated multi-currency portal with CRM routing.'
    },
    {
      id: 'phase-2',
      stepNumber: '02',
      name: 'Architectural De-Risking & Proof of Value (PoC)',
      duration: '5 – 10 Business Days',
      tagline: 'Rapid validation of high-risk technical modules',
      icon: Cpu,
      badge: 'Interactive Staging Prototype',
      problem: {
        heading: 'Building Full Systems on Unverified Assumptions',
        description: 'Committing major capital to build an entire application before proving complex AI reasoning, third-party API reliability, or sub-second query performance leads to catastrophic rewrites.',
        consequence: 'Sunk development costs, fragile integrations, and poor end-user adoption after launch.'
      },
      solution: {
        heading: 'Deploy Functional Staging Prototype with Real Data',
        description: 'We construct isolated working prototypes of the highest-friction technical modules (e.g., dynamic property filtering, RAG customer copilot, offline mobile sync) using live business sample data.',
        tactics: [
          'Interactive containerized staging environment demonstrating sub-second response times',
          'Benchmark validation of LLM prompt reliability and automated document extraction accuracy',
          'Executive review sessions with rapid stakeholder feedback integration'
        ]
      },
      deliverables: [
        'Functional Staging Prototype (Accessible Online)',
        'LLM Accuracy & Latency Benchmark Report',
        'Validated Component Design System'
      ],
      riskMitigation: 'Eliminates 85% of technical unknowns before heavy capital is deployed into full-scale production engineering.',
      realWorldExample: 'Example: Testing invoice OCR against messy supplier PDFs to prove 98%+ automated extraction accuracy before ERP sync.'
    },
    {
      id: 'phase-3',
      stepNumber: '03',
      name: 'Production Engineering & System Hardening',
      duration: '2 – 4 Agile Sprints',
      tagline: 'High-speed, zero-bloat, secure implementation',
      icon: Code2,
      badge: 'Enterprise-Grade Software',
      problem: {
        heading: 'Codebase Bloat, Technical Debt & Security Holes',
        description: 'Amateur and rushed development introduces bloated third-party dependencies, sluggish mobile loading, unhandled runtime edge cases, and zero automated tests that collapse under load.',
        consequence: 'Customer churn, sluggish mobile UX, vulnerable credentials, and massive ongoing bug-fixing overhead.'
      },
      solution: {
        heading: 'Strictly Typed Architecture & 95+ Core Web Vitals',
        description: 'We engineer production software using clean modular TypeScript, Next.js, and React Native. Every component, server route, and state store is built for speed, security, and automated CI/CD verification.',
        tactics: [
          'Strictly typed TypeScript codebase with zero runtime bloat and sub-second FCP',
          'Enterprise server proxy layer isolating all LLM API keys and database credentials',
          'Automated CI/CD test suites with WCAG 2.1 AA accessibility compliance'
        ]
      },
      deliverables: [
        'Production-Ready Codebase in Dedicated Git Repository',
        'Automated CI/CD Test Suite & Lighthouse Audit Report (95+)',
        'Comprehensive Data Schema Dictionaries & API Documentation'
      ],
      riskMitigation: 'Zero-bloat engineering standard: every component and API route is audited for sub-second execution.',
      realWorldExample: 'Example: Engineering a high-conversion healthcare dental portal with instant calendar booking and HIPAA/GDPR safeguards.'
    },
    {
      id: 'phase-4',
      stepNumber: '04',
      name: 'Global Rollout, Handover & SLA Support',
      duration: 'Ongoing / 24/7 Monitoring',
      tagline: 'Multi-region cloud deployment and committed support',
      icon: Globe,
      badge: 'Continuous Reliability & Scale',
      problem: {
        heading: 'Post-Launch Abandonment & Time-Zone Disconnects',
        description: 'Traditional agencies and freelancers vanish after launch, leaving international clients stranded with server outages, broken dependencies, and delayed responses due to opposing time zones.',
        consequence: 'Lost business revenue, broken client trust, and costly emergency contractor fixes.'
      },
      solution: {
        heading: 'Multi-Region Infrastructure & Guaranteed SLA Windows',
        description: 'We deploy to high-availability multi-region cloud infrastructure, configure real-time telemetry and health checks, provide thorough documentation, and back the system with a guaranteed SLA.',
        tactics: [
          'Zero-downtime containerized deployment on enterprise cloud (Cloud Run / AWS)',
          'Real-time uptime telemetry with automated incident alerts to WhatsApp/Slack',
          'Recorded executive and developer video runthroughs for internal team autonomy'
        ]
      },
      deliverables: [
        'Live Multi-Region Production Cloud Deployment',
        'Architecture Video Walkthrough & Team Runbooks',
        'Committed SLA Agreement with Direct Technical Channel'
      ],
      riskMitigation: 'Includes 30-day comprehensive post-launch warranty with zero-cost remediation for any delivery discrepancies.',
      realWorldExample: 'Example: Scaling an offline-first mobile app to 85,000+ active global users with 99.9% uptime.'
    }
  ];

  const currentPhase = deliveryPhases[activePhaseIndex];

  const enterpriseAdvantages = [
    {
      title: '100% Fixed-Price Certainty',
      desc: 'No open-ended billing or hourly traps. Every sprint milestone is strictly tied to verified deliverables and mutual sign-off.',
      icon: FileCheck2
    },
    {
      title: 'Global Time-Zone Synchronization',
      desc: 'Synchronized working windows covering North America, EMEA, and APAC for rapid async updates and scheduled calls.',
      icon: Clock
    },
    {
      title: 'Direct Principal Architect Leadership',
      desc: 'You work directly with the Principal Solutions Architect—not passed around junior developers or account managers.',
      icon: Target
    },
    {
      title: 'Complete IP & Source Code Ownership',
      desc: '100% intellectual property, full Git repository rights, and deployment configuration transferred directly to your organization.',
      icon: ShieldCheck
    }
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800/80"
      aria-label="About Our Practice"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise Practice Overview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Architecting Digital Leverage for Modern Businesses
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              We help international enterprises, healthcare clinics, real estate brokers, and high-growth ventures turn complex operational friction into scalable, high-converting digital software.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200"
            >
              <span>Request Discovery Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Content Grid: Narrative on Left, Leadership & Credentials on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Left Column (7 cols): Editorial Narrative & Core Pillars */}
          <div className="lg:col-span-7 space-y-8">
            {/* Executive Background Narrative */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/70 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>The Engineering Philosophy</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  Production Proven
                </span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>{profile.bio}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{profile.story}</p>
              </div>

              {/* Commitments Bar */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sub-second page speeds (95+ Lighthouse)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Deterministic AI outputs with confidence checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero-data-leakage enterprise LLM security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct architectural leadership on all contracts</span>
                </div>
              </div>
            </div>

            {/* Strategic Pillars Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Solution Domains
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pillar 1 */}
                <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/60">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Web Architecture</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Custom real estate portals, clinical booking engines, and conversion-optimized B2B platforms.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    Next.js • React • TypeScript
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-900/60">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Automation</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Customer support copilots, invoice OCR pipelines, and multi-agent workflow automations.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    RAG • LLM APIs • n8n
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 flex flex-col justify-between hover:border-indigo-500/50 transition-colors">
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-900/60">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mobile Engineering</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Cross-platform iOS & Android apps with offline-first local storage and high-speed UX.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    React Native • SQLite • Expo
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Executive Leadership Card & Verifiable Track Record */}
          <div className="lg:col-span-5 space-y-6">
            {/* Leadership Profile Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-md">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
                <div className="relative shrink-0">
                  <img
                    src={profile.profilePictureUrl || "/profile.jpg"}
                    alt={`${profile.name} - Principal Solutions Architect`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-center border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"
                    title="Active and accepting international engagements"
                  />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-semibold">
                    <Target className="w-3 h-3" />
                    <span>Practice Lead</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {profile.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">{profile.location}</span>
                  </p>
                </div>
              </div>

              {/* Verified Practice Highlights */}
              <div className="py-5 grid grid-cols-3 gap-2 text-center border-b border-slate-100 dark:border-slate-700">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {profile.yearsExperience}+ Yrs
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Production Lead
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                    {profile.completedProjects}+
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Delivered Apps
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    {profile.hoursAutomated.toLocaleString()}+
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Hours Saved
                  </div>
                </div>
              </div>

              {/* Engagement Terms */}
              <div className="pt-5 space-y-3">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Engagement Capacity</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                    Available for Q3/Q4
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Engagements are contracted under structured Master Services Agreements (MSA) with fixed deliverables, sprint milestones, and dedicated code repositories.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{profile.email}</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Schedule</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mission Statement Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50 to-emerald-50/60 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800/80 border border-blue-200/70 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Our Value Commitment</span>
              </div>
              <blockquote className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
                "{profile.drive}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REDESIGNED: How We Deliver Solutions to International Businesses */}
        {/* ========================================================================= */}
        <div className="pt-12 border-t border-slate-200/80 dark:border-slate-800/80">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>International Delivery Framework</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                How We Deliver Solutions to International Businesses
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A precision problem-solving pipeline that eliminates technical uncertainty, de-risks capital, and delivers verifiable business leverage across global time zones.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>4 Structured Milestones • 100% Fixed-Price Transparency</span>
            </div>
          </div>

          {/* Interactive Phase Progression Stepper */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {deliveryPhases.map((phase, idx) => {
              const Icon = phase.icon;
              const isActive = activePhaseIndex === idx;

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-600/20'
                      : 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {/* Active highlight top bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-extrabold tracking-wider ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {phase.stepNumber}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60'
                          : 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {phase.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {phase.name}
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {phase.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Problem-Solving Spotlight Card for Selected Phase */}
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-xl overflow-hidden">
            {/* Top Phase Header Strip */}
            <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[11px] font-bold border border-blue-400/30">
                    Phase {currentPhase.stepNumber} of 04
                  </span>
                  <span className="text-slate-400 text-xs font-mono">•</span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentPhase.duration}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>{currentPhase.name}</span>
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-300 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  {currentPhase.badge}
                </span>
                <div className="flex items-center gap-1 pl-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : deliveryPhases.length - 1))
                    }
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                    title="Previous Phase"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhaseIndex((prev) => (prev < deliveryPhases.length - 1 ? prev + 1 : 0))
                    }
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                    title="Next Phase"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Problem vs. Solution 2-Column Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column (5 cols): The Business Problem We Eliminate */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>The International Business Problem</span>
                  </div>
                  <h5 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {currentPhase.problem.heading}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentPhase.problem.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-200/70 dark:border-amber-900/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">
                    Direct Commercial Consequence:
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    {currentPhase.problem.consequence}
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): The Engineering Solution We Deploy */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Our Precision Engineering Solution</span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {currentPhase.solution.heading}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentPhase.solution.description}
                  </p>

                  {/* Tactics Checklist */}
                  <div className="space-y-2.5 pt-2">
                    {currentPhase.solution.tactics.map((tactic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-relaxed">{tactic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Scenario Callout */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="italic">{currentPhase.realWorldExample}</span>
                </div>
              </div>
            </div>

            {/* Bottom Deliverables & Risk-Mitigation Guarantee Bar */}
            <div className="px-6 sm:px-8 py-5 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Deliverables Badges */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Verifiable Phase Deliverables
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentPhase.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Risk Mitigation Guarantee */}
              <div className="md:max-w-xs p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50 space-y-1 shrink-0">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Risk Mitigation Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                  {currentPhase.riskMitigation}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Commercial Advantage (Why International Businesses Partner With Us) */}
          <div className="mt-12">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Enterprise Standards Backed by Mutual Accountability
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                How our engagement model guarantees zero surprises for international stakeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {enterpriseAdvantages.map((adv, aIdx) => {
                const AdvIcon = adv.icon;
                return (
                  <div
                    key={aIdx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-200"
                  >
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/60">
                        <AdvIcon className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {adv.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
