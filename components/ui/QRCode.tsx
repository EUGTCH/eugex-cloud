'use client'
import { useEffect, useMemo, useState } from 'react'
import { mulberry32 } from '@/lib/utils'

export default function QRCode({ seed }: { seed: number }) {
  const [sec, setSec] = useState(30)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setSec(s => { if (s <= 1) { setTick(x => x + 1); return 30 } return s - 1 })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const cells = useMemo(() => {
    const rnd = mulberry32(seed + tick * 7919)
    const out: [number, number][] = []
    const inFinder = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c > 21) || (r > 21 && c < 7)
    for (let r = 0; r < 29; r++) for (let c = 0; c < 29; c++) if (!inFinder(r, c) && rnd() > .52) out.push([r, c])
    return out
  }, [seed, tick])

  const finder = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="7" height="7" fill="#0B0F17" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#0B0F17" />
    </g>
  )

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[196px] h-[196px] bg-white rounded-2xl p-3 shadow-[0_0_44px_rgba(79,224,255,.22)]">
        <svg viewBox="0 0 29 29" className="w-full h-full">
          {cells.map(([r, c], i) => <rect key={i} x={c} y={r} width="1" height="1" fill="#0B0F17" />)}
          {finder(0, 0, 'a')}{finder(22, 0, 'b')}{finder(0, 22, 'c')}
        </svg>
        <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_12px_#4FE0FF] animate-scan" />
      </div>
      <div className="flex items-center gap-2.5 font-mono text-xs text-dim">
        <svg className="w-[30px] h-[30px] -rotate-90" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="12" fill="none" stroke="rgba(140,160,195,.18)" strokeWidth="3" />
          <circle cx="15" cy="15" r="12" fill="none" stroke="#4FE0FF" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="75.4" strokeDashoffset={75.4 * (1 - sec / 30)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        Код обновится через <b className="text-accent">{sec}</b> с
      </div>
    </div>
  )
}