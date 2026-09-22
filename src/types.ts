export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'AI' | 'Mobile';
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  videoUrl?: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  };
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  coverImage: string;
  published: boolean;
  author: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & Automation' | 'Mobile';
  proficiency: number; // 0 - 100
  years: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badgeCode?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Consulting';
  description: string;
  achievements: string[];
  tech: string[];
  current?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Web' | 'AI' | 'Mobile';
  description: string;
  accent: 'blue' | 'emerald';
  features: string[];
  techTags: string[];
  iconName: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  read: boolean;
}

export interface ProfileInfo {
  name: string;
  title: string;
  roleSubtitle: string;
  valueProposition: string;
  bio: string;
  story: string;
  drive: string;
  email: string;
  location: string;
  availability: string;
  profilePictureUrl?: string;
  yearsExperience: number;
  completedProjects: number;
  clientSatisfaction: number;
  hoursAutomated: number;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface PortfolioData {
  profile: ProfileInfo;
  services: ServiceItem[];
  projects: Project[];
  blogs: BlogPost[];
  skills: Skill[];
  certifications: Certification[];
  experience: ExperienceItem[];
}
