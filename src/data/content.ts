import type { Content } from './types'

/**
 * SINGLE SOURCE OF TRUTH for all site copy and facts.
 * Truth constraints (PRODUCT.md): every claim here is backed by the resume,
 * the GitHub profile README, or a public repo. Nothing invented.
 * Schema-validated at build time — bad edits cannot deploy.
 */
export const content: Content = {
  identity: {
    name: 'Angelo Depamaylo',
    nickname: 'Deps',
    handle: 'Bubblez360',
    title: 'Aspiring Full-Stack Developer · IT Specialist',
    location: 'Zamboanga City, Philippines',
    email: 'depamaylo.angelo360@gmail.com',
    github: 'https://github.com/Bubblez360',
  },

  hero: {
    headline: 'I build software that solves real problems.',
    subline:
      'Full-stack developer from Zamboanga City. I turn messy, manual processes into software people actually want to use — point-of-sale systems, enrollment platforms, HR dashboards. BSIT graduate, ZPPSU 2026.',
    ctaPrimary: 'See what I build',
    ctaSecondary: 'Get in touch',
  },

  about: {
    heading: 'Builder first, in code and in hardware.',
    paragraphs: [
      "I'm Deps — a full-stack developer and IT specialist from the Philippines. My favorite kind of project starts with a real person stuck doing something by hand: a sari-sari store tracking sales on paper, a school processing enrollment forms manually, an HR team buried in applicant documents. I build the software that replaces that.",
      'I work AI-assisted and make no secret of it — tools like Claude Code help me ship faster, but the engineering calls are mine. I trace bugs to root cause, prefer custom components over fragile defaults, and care about the small details: modals, dropdowns, theming, the stuff users feel but never name.',
      "Before software, it was hardware. I build PCs, diagnose faults, and run freelance repair on the side — the same instinct either way: figure out how the thing works, then make it better.",
    ],
    beyondCode:
      "Off the clock I'm Bubblez360 — generative art and 3D modeling in Blender. Same instinct, different canvas.",
  },

  skills: [
    {
      label: 'Frontend',
      tier: 'core',
      items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS', 'Vite'],
    },
    {
      label: 'Backend & Data',
      tier: 'core',
      items: ['PHP (MVC)', 'MySQL', 'Supabase', 'REST API integration'],
    },
    {
      label: 'AI-Assisted Development',
      tier: 'core',
      items: ['Claude Code', 'Prompt engineering', 'AI pair-programming workflows'],
    },
    {
      label: 'Tools',
      tier: 'core',
      items: ['Git & GitHub', 'VS Code', 'Figma', 'Canva', 'OBS Studio'],
    },
    {
      label: 'Hardware & IT',
      tier: 'core',
      items: [
        'PC assembly & upgrades',
        'Hardware diagnostics & repair',
        'OS installation & maintenance',
        'Networking fundamentals',
      ],
    },
    {
      label: 'Familiar with',
      tier: 'familiar',
      items: ['Flutter', 'Firebase', 'Cybersecurity basics'],
    },
  ],

  certifications: [
    { name: 'Claude Code 101', issuer: 'Anthropic', issued: 'Jun 2026' },
    { name: 'Claude 101', issuer: 'Anthropic', issued: 'Jun 2026' },
    { name: 'Networking Basics', issuer: 'Cisco Networking Academy', issued: 'Apr 2024' },
  ],

  projects: [
    {
      slug: 'tindapos',
      name: 'TindaPOS',
      role: 'Solo build — design, code, deploy',
      summary:
        'Offline-first point-of-sale PWA for Filipino sari-sari stores and food stalls. Vendors ring up sales, take GCash QR payments, and print thermal receipts — from a phone, with or without internet.',
      highlights: [
        'Offline-first: sales keep working with no connection, sync when back online',
        'ESC/POS thermal receipt printing straight from the browser via Web Serial',
        'GCash QR payment flow built for how PH vendors actually get paid',
        'Taglish UI with an English toggle — built for the people using it',
        'Installable PWA — no app store, works on the cheap Android phones vendors own',
      ],
      stack: ['React', 'Vite', 'Tailwind CSS', 'IndexedDB', 'Web Serial API', 'PWA'],
      repo: 'https://github.com/Bubblez360/SimplePosSystem',
      live: 'https://simple-pos-system-one.vercel.app',
      featured: true,
      status: 'live',
    },
    {
      slug: 'upstaff',
      name: 'Upstaff Dashboard',
      role: '3-person team — applicant dashboard & HR flows',
      summary:
        'Centralized applicant-information dashboard for a recruitment system: role-based auth, leave requests with credit deduction, document upload and preview, and email notifications.',
      highlights: [
        'Role-based access control across applicant and admin views',
        'Leave-request flow with automatic credit deduction',
        'Document upload, storage, and in-app preview',
      ],
      stack: ['PHP (MVC)', 'JavaScript', 'MySQL', 'Supabase'],
      repo: 'https://github.com/Bubblez360/Upstaff_dashboard_nideps',
      featured: false,
      status: 'shipped',
    },
    {
      slug: 'sta-maria-enrollment',
      name: 'Sta. Maria Enrollment System',
      role: '3-person team — full-stack',
      summary:
        'Enrollment automation for Sta. Maria Central School, replacing manual DepEd SF-EP1 form processing. Cut paperwork, sped up record retrieval, validated everything on the way in.',
      highlights: [
        'Replaced a fully manual DepEd form workflow',
        'Drew implementation interest from a second school (Bualan Elementary)',
        'Input validation throughout the enrollment pipeline',
      ],
      stack: ['PHP', 'MySQL', 'JavaScript'],
      repo: 'https://github.com/Bubblez360/enroll',
      featured: false,
      status: 'shipped',
    },
    {
      slug: 'coffee-pos',
      name: 'Coffee Shop POS',
      role: 'Academic project — full-stack',
      summary:
        'Point-of-sale system for a local coffee shop: transaction processing, user auth, and a streamlined cashier flow. The project that started the POS thread that led to TindaPOS.',
      highlights: [
        'Core transaction processing and inventory basics',
        'User authentication and cashier-focused UI',
      ],
      stack: ['TypeScript', 'PHP', 'HTML & CSS'],
      repo: 'https://github.com/Bubblez360/depsa',
      featured: false,
      status: 'shipped',
    },
    {
      slug: 'bubz-artwork',
      name: 'BuBz Artwork',
      role: 'Solo — design & build',
      summary:
        'Gallery site for my generative art and characters, with a community wall. Where the Bubblez360 side of the work lives.',
      highlights: ['Personal gallery with community wall feature'],
      stack: ['HTML & CSS', 'JavaScript'],
      repo: 'https://github.com/Bubblez360/BuBzArtwork',
      featured: false,
      status: 'in-progress',
    },
  ],

  experience: [
    {
      role: 'Assistant Intern',
      org: 'Radyo iFM Music & News, Zamboanga',
      period: 'May – Jul 2024',
      points: [
        'Ran live-stream broadcasts with OBS Studio and Streamlabs — 1,000+ views per event on Facebook',
        'Designed 20+ event themes and visual assets in Figma and Canva with the production team',
      ],
    },
    {
      role: 'Administrative Assistant Intern',
      org: 'ZPPSU Senior High School',
      period: '2024',
      points: [
        'Digitized and organized student enrollment records for fast, accurate retrieval',
      ],
    },
  ],

  contact: {
    heading: "Let's build something.",
    blurb:
      "Open to full-stack and junior software roles, IT and technical support, and freelance web projects. If you've got messy manual work that should be software, I want to hear about it.",
    formNote: 'Or reach me directly — I read everything.',
  },

  site: {
    url: 'https://PLACEHOLDER.vercel.app', // set after Vercel project creation (decision F6 — single SITE_URL source)
    metaTitle: 'Angelo Depamaylo — Full-Stack Developer & IT Specialist',
    metaDescription:
      'Angelo "Deps" Depamaylo — full-stack developer from Zamboanga City, PH. Builder of TindaPOS and software that replaces manual work. BSIT graduate, ZPPSU 2026.',
  },
}
