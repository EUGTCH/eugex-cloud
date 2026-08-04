'use client'
import { useEffect, useRef } from 'react'

export default function EqBars({ bars = 40, speed = 2, className = '' }: { bars?: number; speed?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const x = cv.getContext('2d')!
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, raf = 0
    const fit = () => { W = cv.width = cv.offsetWidth * 2; H = cv.height = cv.offsetHeight * 2 }
    fit(); addEventListener('resize', fit)
    const ph = Array.from({ length: bars }, () => Math.random() * 7)
    let t = 0

    const frame = () => {
      t += .016; x.clearRect(0, 0, W, H)
      const bw = W / bars
      for (let i = 0; i < bars; i++) {
        const h = (rm ? .5 : (.35 + .65 * (.5 + .5 * Math.sin(t * speed + ph[i])) * (.6 + .4 * Math.sin(t * 1.3 + i)))) * H * .82
        const g = x.createLinearGradient(0, H, 0, H - h)
        g.addColorStop(0, 'rgba(79,224,255,.08)'); g.addColorStop(1, 'rgba(123,140,255,.85)')
        x.fillStyle = g
        const w = bw * .52
        x.fillRect(i * bw + (bw - w) / 2, H - h, w, h)
      }
      if (!rm) raf = requestAnimationFrame(frame)
    }
    frame()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit) }
  }, [bars, speed])

  return <canvas ref={ref} className={className} />
}