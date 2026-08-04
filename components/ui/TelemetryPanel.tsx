'use client'
import { useEffect, useState, useRef } from 'react'
import EqBars from './EqBars'
import { fmt } from '@/lib/constants'

const LOGS: [string, string][] = [
  ['ok', 'node ms-042 :: sync 128 МБ :: 0.4ms'],
  ['api', 'POST /v2/aggregate → 201 (12ms)'],
  ['ok', 'shard 7/12 rebalanced :: healthy'],
  ['job', 'etl-pipeline #8841 completed :: 4.2 ГБ'],
  ['sec', 'TLS 1.3 handshake :: OK'],
  ['ok', 'throughput 14.2 ГБ/с :: +3.1%'],
  ['api', 'GET /v2/compute/status → 200 (8ms)'],
  ['job', 'backup snapshot #1207 :: stored'],
  ['ok', 'cluster heartbeat :: 12 537 nodes'],
  ['sec', 'auth gateway :: 0 подозрительных сессий'],
]
const TAG: Record<string, string> = { ok: 'text-mint', api: 'text-accent', job: 'text-indigo2', sec: 'text-amber2' }
type Ln = { ts: string; k: string; t: string }

export default function TelemetryPanel() {
  const [nodes, setNodes] = useState(12537)
  const [thr, setThr] = useState(14.2)
  const [lat, setLat] = useState(0.42)
  const [log, setLog] = useState<Ln[]>([])
  const rm = useRef(false)

  useEffect(() => {
    rm.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const push = () => {
      const [k, t] = LOGS[Math.floor(Math.random() * LOGS.length)]
      const d = new Date()
      const ts = [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, '0')).join(':')
      setLog(l => [...l.slice(-6), { ts, k, t }])
    }
    for (let i = 0; i < 5; i++) push()
    if (rm.current) return
    const li = setInterval(push, 1400)
    const ti = setInterval(() => {
      setNodes(n => n + Math.round((Math.random() - .45) * 6))
      setThr(t => Math.max(11, Math.min(18, t + (Math.random() - .5) * .6)))
      setLat(l => Math.max(.3, Math.min(.7, l + (Math.random() - .5) * .05)))
    }, 2200)
    return () => { clearInterval(li); clearInterval(ti) }
  }, [])

  const tm = [
    ['Узлы активны', <b key="1" className="font-display text-[21px] font-semibold block mt-1">{fmt(nodes)}</b>],
    ['Пропускная', <b key="2" className="font-display text-[21px] font-semibold block mt-1">{thr.toFixed(1)}<em className="not-italic text-[11px] text-accent font-mono ml-1">ГБ/с</em></b>],
    ['Задержка', <b key="3" className="font-display text-[21px] font-semibold block mt-1">{lat.toFixed(2)}<em className="not-italic text-[11px] text-accent font-mono ml-1">мс</em></b>],
    ['Uptime · 90 дн', <b key="4" className="font-display text-[21px] font-semibold block mt-1">99.98<em className="not-italic text-[11px] text-accent font-mono ml-1">%</em></b>],
  ]

  return (
    <aside className="corners bg-gradient-to-b from-panel2/90 to-ink/90 border border-line2 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.5)]">
      <div className="flex items-center gap-2.5 font-mono text-xs text-mut px-[18px] py-3.5 border-b border-line">
        <i className="w-[7px] h-[7px] rounded-full bg-mint shadow-[0_0_10px_#3EE6A8] animate-blink" /> eugex://cluster-telemetry
        <span className="ml-auto text-[10px] tracking-[.2em] text-coral border border-coral/40 px-2 py-0.5 rounded animate-blink">LIVE</span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line border-b border-line">
        {tm.map(([label, val], i) => (
          <div key={i} className="bg-[#0A101D] px-[18px] py-[15px]">
            <small className="font-mono text-[9.5px] tracking-[.18em] text-dim uppercase block">{label}</small>
            {val}
          </div>
        ))}
      </div>
      <EqBars bars={44} speed={2.4} className="w-full h-24 block border-b border-line" />
      <div className="font-mono text-[11.5px] leading-[1.9] px-[18px] py-3.5 h-[158px] overflow-hidden flex flex-col justify-end bg-black/40">
        {log.map((l, i) => (
          <div key={i} className="whitespace-nowrap overflow-hidden text-ellipsis text-dim">
            <span className="text-[#46536b]">{l.ts}</span> [<span className={TAG[l.k]}>{l.k}</span>] {l.t}
          </div>
        ))}
      </div>
      <div className="font-mono text-[10.5px] text-dim px-[18px] py-2.5 border-t border-line tracking-wide">TLS 1.3 · AES-256 · регион: CIS / international · платформа v2.14.8</div>
    </aside>
  )
}