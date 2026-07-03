import { useState } from 'react'
import { Send } from 'lucide-react'
import { content } from '../../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return // double-submit guard

    const form = e.currentTarget
    const data = new FormData(form)

    // honeypot: bots fill the hidden field; humans never see it
    if (data.get('website')) {
      setStatus('sent') // pretend success, drop silently
      return
    }
    data.append('access_key', accessKey)
    data.delete('website')

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col justify-center rounded-xl bg-surface p-8" role="status">
        <p className="text-heading font-bold">Message sent.</p>
        <p className="mt-2 text-sm text-ink-soft">
          Thanks — I read everything and I'll get back to you.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate={false}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className="h-12 rounded-lg border border-line bg-paper px-4 text-ink placeholder:text-ink-soft/70 focus:border-accent"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className="h-12 rounded-lg border border-line bg-paper px-4 text-ink placeholder:text-ink-soft/70 focus:border-accent"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          maxLength={3000}
          className="rounded-lg border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/70 focus:border-accent"
          placeholder="What are we building?"
        />
      </div>

      {/* honeypot — hidden from humans and screen readers */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent-solid px-6 font-semibold text-white transition-colors duration-200 hover:bg-accent-solid-hover disabled:cursor-default disabled:opacity-60"
      >
        <Send size={16} aria-hidden />
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-sm text-ink">
          Couldn't send —{' '}
          <a href={`mailto:${content.identity.email}`} className="font-semibold text-accent underline">
            email me directly
          </a>{' '}
          instead.
        </p>
      )}
    </form>
  )
}
