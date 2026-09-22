import React, { useState } from 'react';
import { Award, ExternalLink, Cpu, Layout, Server, Smartphone, CheckCircle, ShieldCheck } from 'lucide-react';
import { Skill, Certification } from '../types';

interface SkillsProps {
  skills: Skill[];
  certifications: Certification[];
}

export const Skills: React.FC<SkillsProps> = ({ skills, certifications }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { label: 'All Disciplines', value: 'All' },
    { label: 'AI & Automation', value: 'AI & Automation', icon: Cpu },
    { label: 'Frontend', value: 'Frontend', icon: Layout },
    { label: 'Mobile (React Native)', value: 'Mobile', icon: Smartphone },
    { label: 'Backend & Cloud', value: 'Backend', icon: Server },
  ];

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory;
  });

  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80"
      aria-label="Technical Skills and Certifications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skills & Verified Certifications
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Production-tested capabilities with emerald proficiency indicators and verifiable enterprise credentials.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 self-start md:self-auto">
            {categories.map((c) => {
              const isActive = selectedCategory === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setSelectedCategory(c.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 dark:text-white">{skill.name}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-sm bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-normal">
                    {skill.category}
                  </span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{skill.proficiency}%</span>
              </div>

              {/* Progress Bar Container: Fill color is Accent Secondary / Emerald (#10B981 / #34D399) */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-1000 ease-out shadow-xs"
                  style={{ width: `${skill.proficiency}%` }}
                  role="progressbar"
                  aria-valuenow={skill.proficiency}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency ${skill.proficiency}%`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Industry Certifications & Credentials</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Recognized credentials in cloud computing, generative AI, and mobile architecture.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 hover:-translate-y-0.5 overflow-hidden"
              >
                {cert.imageUrl && (
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 mb-1">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-sm border border-emerald-200 dark:border-emerald-800">
                      Certified
                    </span>
                    <span className="text-[11px] text-slate-400">{cert.issueDate}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Issued by <span className="text-slate-700 dark:text-slate-300 font-semibold">{cert.issuer}</span>
                  </p>

                  {cert.badgeCode && (
                    <div className="font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                      ID: {cert.badgeCode}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
