import React, { useState } from 'react';
import { FolderGit2, ArrowRight, ExternalLink, Github, Sparkles, Filter, CheckCircle2, Video } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Web' | 'AI' | 'Mobile'>('All');

  const categories = [
    { label: 'All Projects', value: 'All' },
    { label: 'Website Development', value: 'Web' },
    { label: 'AI Integration', value: 'AI' },
    { label: 'Mobile Apps (React Native)', value: 'Mobile' },
  ] as const;

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80"
      aria-label="Portfolio Projects & Case Studies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Real-world client and production projects detailing the specific problem, architectural solution, and measurable business impact.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 self-start md:self-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Image & Metric Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                {/* Top Badge: Category & Video indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                      project.category === 'AI'
                        ? 'bg-emerald-600 text-white'
                        : project.category === 'Mobile'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {project.category}
                  </span>
                  {project.videoUrl && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md border border-slate-700">
                      <Video className="w-3 h-3 text-blue-400" />
                      <span>Video</span>
                    </span>
                  )}
                </div>

                {/* Key Metric overlay */}
                {project.metrics && (
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-right">
                    <div className="text-xs font-bold text-emerald-400 leading-none">{project.metrics.value}</div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-tight">{project.metrics.label}</div>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Source Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
