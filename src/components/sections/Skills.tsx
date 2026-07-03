import { content } from '../../data/content'

export default function Skills() {
  const core = content.skills.filter((g) => g.tier === 'core')
  const familiar = content.skills.filter((g) => g.tier === 'familiar')

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <h2 id="skills-heading" className="text-title font-bold tracking-[-0.02em]">
          What I work with
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((group) => (
            <div key={group.label}>
              <h3 className="font-semibold text-ink">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {familiar.map((group) => (
          <p key={group.label} className="mt-10 border-t border-line pt-5 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{group.label}:</span>{' '}
            {group.items.join(' · ')}
          </p>
        ))}

        {/* Certifications live with skills — credentials next to claims */}
        <div id="certifications" className="mt-14">
          <h3 className="text-heading font-bold tracking-[-0.02em]">Certifications</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {content.certifications.map((c) => (
              <li
                key={c.name}
                className="flex flex-wrap items-baseline justify-between gap-2 py-4"
              >
                <span className="font-medium text-ink">{c.name}</span>
                <span className="font-mono text-xs text-ink-soft">
                  {c.issuer} · {c.issued}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
