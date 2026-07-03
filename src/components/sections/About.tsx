import { content } from '../../data/content'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <h2 id="about-heading" className="text-title font-bold tracking-[-0.02em]">
          {content.about.heading}
        </h2>

        <div className="flex max-w-[65ch] flex-col gap-5 text-body text-ink-soft">
          {content.about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="mt-2 border-t border-line pt-5 font-medium text-ink">
            {content.about.beyondCode}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-4">
            {content.experience.map((exp) => (
              <div key={exp.org} className="rounded-lg bg-surface p-4">
                <dt className="font-semibold text-ink">{exp.role}</dt>
                <dd className="mt-1 text-sm">
                  {exp.org}
                  <span className="mt-1 block font-mono text-xs">{exp.period}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
