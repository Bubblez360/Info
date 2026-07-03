import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { content } from './content'

/**
 * Build gate (decision F3 / Eng Review 1B): this suite runs inside the build
 * script BEFORE vite build — malformed content.ts physically cannot deploy.
 */

const nonEmpty = z.string().trim().min(1)

const projectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
  name: nonEmpty,
  role: nonEmpty,
  summary: nonEmpty.max(400),
  highlights: z.array(nonEmpty).min(1),
  stack: z.array(nonEmpty).min(1),
  repo: z.string().url().startsWith('https://github.com/').optional(),
  live: z.string().url().optional(),
  featured: z.boolean(),
  status: z.enum(['live', 'shipped', 'in-progress']),
})

const contentSchema = z.object({
  identity: z.object({
    name: nonEmpty,
    nickname: nonEmpty,
    handle: nonEmpty,
    title: nonEmpty,
    location: nonEmpty,
    email: z.string().email(),
    github: z.string().url().startsWith('https://github.com/'),
  }),
  hero: z.object({
    headline: nonEmpty.max(120),
    subline: nonEmpty.max(400),
    ctaPrimary: nonEmpty.max(30),
    ctaSecondary: nonEmpty.max(30),
  }),
  about: z.object({
    heading: nonEmpty,
    paragraphs: z.array(nonEmpty).min(1),
    beyondCode: nonEmpty,
  }),
  skills: z
    .array(
      z.object({
        label: nonEmpty,
        tier: z.enum(['core', 'familiar']),
        items: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
  certifications: z
    .array(
      z.object({
        name: nonEmpty,
        issuer: nonEmpty,
        issued: z.string().regex(/^[A-Z][a-z]{2} \d{4}$/, 'format: "MMM YYYY"'),
      }),
    )
    .min(1),
  projects: z.array(projectSchema).min(1),
  experience: z
    .array(
      z.object({
        role: nonEmpty,
        org: nonEmpty,
        period: nonEmpty,
        points: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
  contact: z.object({
    heading: nonEmpty,
    blurb: nonEmpty,
    formNote: nonEmpty,
  }),
  site: z.object({
    url: z.string().url(),
    metaTitle: nonEmpty.max(70),
    metaDescription: nonEmpty.max(170),
  }),
})

describe('content schema (build gate)', () => {
  it('validates against the full schema', () => {
    const result = contentSchema.safeParse(content)
    if (!result.success) {
      // surface every violation, not just the first
      throw new Error(JSON.stringify(result.error.format(), null, 2))
    }
    expect(result.success).toBe(true)
  })

  it('has exactly one featured project', () => {
    expect(content.projects.filter((p) => p.featured)).toHaveLength(1)
  })

  it('has unique project slugs', () => {
    const slugs = content.projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('truth constraints: no phone number anywhere', () => {
    const blob = JSON.stringify(content)
    expect(blob).not.toMatch(/09\d{9}|\+63/)
  })

  it('truth constraints: no LinkedIn link (unconfirmed, decision D4)', () => {
    expect(JSON.stringify(content)).not.toMatch(/linkedin/i)
  })

  it('featured project has a live URL', () => {
    const featured = content.projects.find((p) => p.featured)
    expect(featured?.live).toBeTruthy()
  })
})
