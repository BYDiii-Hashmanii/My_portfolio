import React from 'react';
import { ShieldCheck, Globe, Zap, Clock, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const EnterpriseCapabilities: React.FC = () => {
  const internationalHighlights = [
    {
      icon: Globe,
      title: 'Global Delivery & Time-Zone Agnostic',
      description: 'Synchronized delivery with teams across North America, EMEA, and APAC. Agile sprints, transparent milestone reporting, and guaranteed overlapping communication windows.',
      metric: 'UTC-8 to UTC+8',
      metricLabel: 'Working Coverage'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security & Compliance',
      description: 'Strict data privacy safeguards, SOC2 / ISO-ready architecture design, GDPR / CCPA compliance consulting, and zero-leakage enterprise LLM integrations.',
      metric: '100%',
      metricLabel: 'Zero-Data-Retention LLMs'
    },
    {
      icon: Zap,
      title: 'Measurable ROI & Business Leverage',
      description: 'Engineering systems designed directly around commercial metrics: lowering customer acquisition costs, accelerating lead-to-close velocity, and automating repetitive operational hours.',
      metric: '82%',
      metricLabel: 'Avg. Workflow Efficiency Gain'
    },
    {
      icon: Users,
      title: 'Flexible International Engagement Models',
      description: 'End-to-end turnkey product execution, dedicated engineering pod extension, or targeted technical advisory and AI feasibility audits under standard international Master Services Agreements (MSA).',
      metric: '< 48 hrs',
      metricLabel: 'Sprint Kickoff Time'
    }
  ];

  const clientLocations = [
    { country: 'United States', flag: '🇺🇸', focus: 'AI Workflow & SaaS Platforms' },
    { country: 'United Kingdom', flag: '🇬🇧', focus: 'Real Estate & PropTech Portals' },
    { country: 'United Arab Emirates', flag: '🇦🇪', focus: 'Automated CRM & Enterprise Tools' },
    { country: 'Canada', flag: '🇨🇦', focus: 'Healthcare & Patient Management' },
    { country: 'Australia', flag: '🇦🇺', focus: 'Cross-Platform React Native Apps' },
    { country: 'Singapore', flag: '🇸🇬', focus: 'Fintech & Transaction Security' }
  ];

  return (
    <section
      id="enterprise-solutions"
      className="py-20 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80"
      aria-label="Enterprise Solutions and Global Delivery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>International Engineering Partner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enterprise Solutions Tailored for International Scale
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            We partner with international organizations, high-growth startups, and established enterprises to solve mission-critical operational challenges with world-class engineering.
          </p>
        </div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {internationalHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-lg transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/80">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-700/60">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.metric}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {item.metricLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Clients & Delivery Geography Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Worldwide Deployment Readiness</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Trusted by Businesses Across Multiple Continents
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether deploying a comprehensive property portal with multi-currency calculations, an automated customer support co-pilot, or a real-time mobile app, our solutions conform to international quality benchmarks.
              </p>
            </div>

            {/* Geography Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {clientLocations.map((loc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5"
                >
                  <span className="text-xl leading-none">{loc.flag}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{loc.country}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{loc.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
