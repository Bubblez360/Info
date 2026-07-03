import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Generative signature (Scope Decision #4): seeded "bubble field" — Bubblez360
 * made literal. Single render path: same algorithm animated or drawn once
 * (reduced motion / unsupported). Main-thread rAF, capped count, paused when
 * off-viewport or tab hidden.
 */

const BUBBLE_COUNT = 34

// mulberry32 — tiny seeded PRNG, new seed per visit
function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Bubble {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  phase: number
  hue: number
  alpha: number
}

function makeBubbles(rand: () => number, w: number, h: number): Bubble[] {
  return Array.from({ length: BUBBLE_COUNT }, () => ({
    x: rand() * w,
    y: rand() * h,
    r: 4 + rand() * 42,
    speed: 0.15 + rand() * 0.45,
    drift: 0.5 + rand() * 1.5,
    phase: rand() * Math.PI * 2,
    hue: 285 + rand() * 25, // violet band
    alpha: 0.05 + rand() * 0.14,
  }))
}

function draw(ctx: CanvasRenderingContext2D, bubbles: Bubble[], w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h)
  for (const b of bubbles) {
    const y = ((b.y - t * b.speed) % (h + b.r * 2)) + (b.y - t * b.speed < -b.r * 2 ? h + b.r * 2 : 0)
    const x = b.x + Math.sin(t * 0.001 * b.drift + b.phase) * 18
    ctx.beginPath()
    ctx.arc(x, y < -b.r ? y + h + b.r * 2 : y, b.r, 0, Math.PI * 2)
    ctx.strokeStyle = `oklch(60% 0.18 ${b.hue} / ${b.alpha + 0.06})`
    ctx.fillStyle = `oklch(65% 0.16 ${b.hue} / ${b.alpha})`
    ctx.fill()
    ctx.stroke()
  }
}

export default function GenArtCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return // unsupported — plain background, no error

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let bubbles: Bubble[] = []
    const rand = rng(Date.now() >>> 0)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bubbles = makeBubbles(rand, w, h)
      if (reduced) draw(ctx, bubbles, w, h, 4000) // one frame, loop never starts
    }
    resize()

    if (reduced) {
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }

    let raf = 0
    let visible = true
    let inView = true
    const loop = (t: number) => {
      draw(ctx, bubbles, w, h, t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (visible && inView) raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (!inView) cancelAnimationFrame(raf)
      else start()
    })
    io.observe(canvas)

    const onVis = () => {
      visible = document.visibilityState === 'visible'
      if (!visible) cancelAnimationFrame(raf)
      else start()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('resize', resize)
    start()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
