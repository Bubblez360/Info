import { describe, expect, it } from 'vitest'
// @ts-expect-error — plain .mjs module, typed loosely on purpose
import { buildSnapshot } from '../../scripts/snapshot.mjs'
import committed from './snapshot.json'

const fakeRepo = (over: Record<string, unknown> = {}) => ({
  name: 'repo',
  html_url: 'https://github.com/Bubblez360/repo',
  fork: false,
  language: 'TypeScript',
  stargazers_count: 0,
  updated_at: '2026-07-01T00:00:00Z',
  description: 'a repo',
  ...over,
})

const okResponse = (body: unknown) =>
  ({ ok: true, json: async () => body }) as unknown as Response

describe('snapshot generator (Eng Review 3A — loud failure)', () => {
  it('builds schema-valid snapshot from API response', async () => {
    const repos = [
      fakeRepo({ name: 'a', stargazers_count: 3 }),
      fakeRepo({ name: 'b', language: 'PHP', updated_at: '2026-07-02T00:00:00Z' }),
      fakeRepo({ name: 'forked', fork: true }),
    ]
    const snap = await buildSnapshot(async () => okResponse(repos))
    expect(snap.publicRepos).toBe(2) // forks excluded
    expect(snap.lastActive).toBe('2026-07-01') // API order preserved, not star order
    expect(snap.featured[0].name).toBe('a') // stars win featured slot
    expect(snap.languageShare.map((l: { name: string }) => l.name)).toContain('PHP')
  })

  it('throws on non-OK API response (Action must fail loudly)', async () => {
    await expect(
      buildSnapshot(async () => ({ ok: false, status: 403 }) as unknown as Response),
    ).rejects.toThrow('403')
  })

  it('throws on empty repo list (refuses to commit garbage)', async () => {
    await expect(buildSnapshot(async () => okResponse([]))).rejects.toThrow('no repositories')
  })

  it('committed snapshot.json has required shape', () => {
    expect(committed.user).toBe('Bubblez360')
    expect(committed.publicRepos).toBeGreaterThan(0)
    expect(committed.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(committed.languageShare.length).toBeGreaterThan(0)
    expect(committed.featured.length).toBeGreaterThan(0)
  })
})
