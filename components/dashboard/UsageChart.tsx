'use client'
import { useEffect, useRef } from 'react'
import { mulberry32 } from '@/lib/utils'

export default function UsageChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!
    const x = cv.getContext('2d')!
    cv.width = cv.offsetWidth * 2; cv.height = 360
    const rnd = mulberry32(42), n = 30, bw = cv.width / n
    for (let i = 0; i < n; i++) {
      const h = (.25 + rnd() * .6) * cv.height * .8
      const g = x.createLinearGradient(0, cv.height, 0, cv.height - h)
      g.addColorStop(0, 'rgba(79,224,255,.06)')
      g.addColorStop(1, i === n - 1 ? 'rgba(62,230,168,.9)' : 'rgba(123,140,255,.75)')
      x.fillStyle = g
      x.fillRect(i * bw + bw * .2, cv.height - h, bw * .6, h)
    }
    x.fillStyle = 'rgba(93,107,131,.9)'; x.font = '18px JetBrains Mono, monospace'
    x.fillText('← 30 дней', 8, 26)
    x.fillText(Math.round(20 + rnd() * 30) + ' ГБ · сегодня', cv.width - 230, 26)
  }, [])
  return <canvas ref={ref} className="w-full h-[180px] block" />
}