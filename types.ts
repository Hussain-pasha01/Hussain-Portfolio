import { ElementType } from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Languages';
  icon?: ElementType;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  role?: string;
  features?: string[];
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}