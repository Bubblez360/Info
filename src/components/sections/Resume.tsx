import { Download } from 'lucide-react'
import { content } from '../../data/content'

/**
 * Resume policy (decision F7): renders from content.ts — accurate by
 * construction. The PDF button appears only when a corrected PDF exists
 * (set HAS_RESUME_PDF to true after adding public/angelo-depamaylo-resume.pdf).
 * v1 never links the known-stale PDF.
 */
const HAS_RESUME_PDF = false
const RESUME_PDF_PATH = '/angelo-depamaylo-resume.pdf'

export default function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="resume-heading" className="text-title font-bold tracking-[-0.02em]">
            Resume
          </h2>
          {HAS_RESUME_PDF && (
            <a
              href={RESUME_PDF_PATH}
              download
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-line px-5 font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Download size={16} aria-hidden /> Download PDF
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="font-mono text-sm text-ink-soft">Education</h3>
            <p className="mt-3 font-semibold text-ink">BS Information Technology</p>
            <p className="mt-1 text-sm text-ink-soft">
              Zamboanga Peninsula Polytechnic State University
              <span className="mt-1 block font-mono text-xs">Graduated 2026</span>
            </p>
          </div>

          <div>
            <h3 className="font-mono text-sm text-ink-soft">Experience</h3>
            <ul className="mt-3 flex flex-col gap-4">
              {content.experience.map((exp) => (
                <li key={exp.org}>
                  <p className="font-semibold text-ink">{exp.role}</p>
                  <p className="text-sm text-ink-soft">
                    {exp.org}
                    <span className="mt-0.5 block font-mono text-xs">{exp.period}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm text-ink-soft">Languages</h3>
            <p className="mt-3 text-sm text-ink-soft">
              Chavacano (native) · English (conversational) · Filipino/Tagalog
            </p>
            <h3 className="mt-6 font-mono text-sm text-ink-soft">Certifications</h3>
            <ul className="mt-3 flex flex-col gap-1 text-sm text-ink-soft">
              {content.certifications.map((c) => (
                <li key={c.name}>
                  {c.name} — {c.issuer}, {c.issued}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
