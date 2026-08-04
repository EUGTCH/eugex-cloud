'use client'
import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const x = cv.getContext('2d')!
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, raf = 0
    const fit = () => { W = cv.width = innerWidth; H = cv.height = innerHeight }
    fit(); addEventListener('resize', fit)

    const N = Math.min(80, Math.floor(innerWidth / 16))
    const P = Array.from({ length: N }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.6 + .5,
    }))

    const draw = () => {
      x.clearRect(0, 0, W, H)
      P.forEach(p => {
        if (!rm) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fillStyle = 'rgba(120,190,255,.45)'; x.fill()
      })
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
        const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = dx * dx + dy * dy
        if (d < 14000) {
          x.beginPath(); x.moveTo(P[i].x, P[i].y); x.lineTo(P[j].x, P[j].y)
          x.strokeStyle = `rgba(100,180,255,${.12 * (1 - d / 14000)})`; x.lineWidth = 1; x.stroke()
        }
      }
      if (!rm) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit) }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-0 grid-bg" />
      <canvas ref={ref} className="absolute inset-0" />
      <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-50 blur-[110px] animate-drift1 bg-[radial-gradient(circle,rgba(79,224,255,.22),transparent_65%)]" />
      <div className="absolute top-1/3 -right-56 w-[640px] h-[640px] rounded-full opacity-50 blur-[110px] animate-drift2 bg-[radial-gradient(circle,rgba(123,140,255,.18),transparent_65%)]" />
      <div className="absolute -bottom-40 left-[28%] w-[480px] h-[480px] rounded-full opacity-40 blur-[110px] animate-drift1 bg-[radial-gradient(circle,rgba(62,230,168,.12),transparent_65%)]" />
      <div className="absolute inset-0 noise" />
    </div>
  )
}