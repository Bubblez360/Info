import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { content } from '../../data/content'
import ContactForm from './ContactForm'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.identity.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — mailto link right next to it still works
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2
              id="contact-heading"
              className="max-w-[14ch] text-display leading-[1.05] font-extrabold tracking-[-0.03em]"
            >
              {content.contact.heading}
            </h2>
            <p className="mt-6 max-w-[52ch] text-body text-ink-soft">{content.contact.blurb}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${content.identity.email}`}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg bg-accent-solid px-6 font-semibold text-white transition-colors duration-200 hover:bg-accent-solid-hover"
              >
                <Mail size={16} aria-hidden /> Email me
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-line px-5 font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                {copied ? 'Copied!' : 'Copy address'}
              </button>
              <a
                href={content.identity.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {/* GitHub brand mark (lucide dropped brand icons) */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>

            <p className="mt-5 font-mono text-sm text-ink-soft">{content.identity.email}</p>
          </div>

          {/* Decision F2: form renders only when the key exists — never a dead form */}
          {WEB3FORMS_KEY ? (
            <ContactForm accessKey={WEB3FORMS_KEY} />
          ) : (
            <p className="self-center text-sm text-ink-soft lg:max-w-[36ch]">
              {content.contact.formNote}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
