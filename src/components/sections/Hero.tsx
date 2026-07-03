import { ArrowDown, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import { content } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()
  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-[clamp(4rem,10vw,8rem)] pb-[clamp(4rem,8vw,7rem)] sm:px-6">
        <motion.p {...rise} className="mb-6 flex items-center gap-2 font-mono text-sm text-ink-soft">
          <MapPin size={14} aria-hidden className="text-accent" />
          {content.identity.location}
        </motion.p>

        <motion.h1
          {...rise}
          transition={reduced ? undefined : { ...rise.transition, delay: 0.08 }}
          className="max-w-[16ch] text-display leading-[1.02] font-extrabold tracking-[-0.03em]"
        >
          I build software that solves{' '}
          <span className="text-accent">real problems</span>.
        </motion.h1>

        <motion.p
          {...rise}
          transition={reduced ? undefined : { ...rise.transition, delay: 0.16 }}
          className="mt-8 max-w-[58ch] text-body text-ink-soft"
        >
          {content.hero.subline}
        </motion.p>

        <motion.div
          {...rise}
          transition={reduced ? undefined : { ...rise.transition, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg bg-accent-solid px-6 font-semibold text-white transition-colors duration-200 hover:bg-accent-solid-hover"
          >
            {content.hero.ctaPrimary}
            <ArrowDown size={16} aria-hidden />
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 cursor-pointer items-center rounded-lg border border-line px-6 font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {content.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.p
          {...rise}
          transition={reduced ? undefined : { ...rise.transition, delay: 0.32 }}
          className="mt-14 font-mono text-sm text-ink-soft"
        >
          {content.identity.title}
        </motion.p>
      </div>
    </section>
  )
}
