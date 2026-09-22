import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section
      id="experience"
      className="py-20 md:py-28"
      aria-label="Professional Experience & Timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Delivery Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consulting Engagements & Practice Leadership
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            A demonstrable history of architecting mission-critical platforms, directing solution engineering, and deploying autonomous AI pipelines for international organizations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {experience.map((item) => (
            <div
              key={item.id}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-6 sm:-left-10 top-1.5 w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-full border-4 transition-transform duration-200 group-hover:scale-110 flex items-center justify-center ${
                  item.current
                    ? 'border-white dark:border-slate-900 bg-emerald-500 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-500'
                    : 'border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700'
                }`}
              />

              {/* Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.role}
                      </h3>
                      {item.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Key Achievements
                  </p>
                  <ul className="space-y-1.5">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
