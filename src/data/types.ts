export interface Project {
  slug: string
  name: string
  role: string
  summary: string
  highlights: string[]
  stack: string[]
  repo?: string
  live?: string
  featured: boolean
  status: 'live' | 'shipped' | 'in-progress'
}

export interface SkillGroup {
  label: string
  /** 'core' = repo/resume-backed proficiency; 'familiar' = listed exposure, visually distinct tier */
  tier: 'core' | 'familiar'
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  issued: string // "MMM YYYY"
}

export interface Experience {
  role: string
  org: string
  period: string
  points: string[]
}

export interface Content {
  identity: {
    name: string
    nickname: string
    handle: string
    title: string
    location: string
    email: string
    github: string
  }
  hero: {
    headline: string
    subline: string
    ctaPrimary: string
    ctaSecondary: string
  }
  about: {
    heading: string
    paragraphs: string[]
    beyondCode: string
  }
  skills: SkillGroup[]
  certifications: Certification[]
  projects: Project[]
  experience: Experience[]
  contact: {
    heading: string
    blurb: string
    formNote: string
  }
  site: {
    /** single source for canonical/OG/sitemap URLs — swap for custom domain later (decision F6) */
    url: string
    metaTitle: string
    metaDescription: string
  }
}
