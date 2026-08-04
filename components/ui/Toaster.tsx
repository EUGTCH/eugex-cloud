'use client'
import { useEffect, useState } from 'react'

type T = { id: number; title: string; sub?: string; kind: 'ok' | 'warn' | 'err' }
let push: (t: Omit<T, 'id'>) => void = () => {}

export function toast(title: string, sub?: string, kind: T['kind'] = 'ok') { push({ title, sub, kind }) }

const border = { ok: 'border-l-accent', warn: 'border-l-amber2', err: 'border-l-coral' }

export default function Toaster() {
  const [list, setList] = useState<T[]>([])
  useEffect(() => {
    push = t => {
      const id = Date.now() + Math.random()
      setList(l => [...l, { ...t, id }])
      setTimeout(() => setList(l => l.filter(x => x.id !== id)), 4200)
    }
  }, [])
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5">
      {list.map(t => (
        <div key={t.id} className={`bg-panel2 border border-line2 border-l-[3px] ${border[t.kind]} rounded-xl px-4 py-3.5 min-w-[280px] max-w-[360px] shadow-2xl`}>
          <p className="text-[13.5px] font-bold">{t.title}</p>
          {t.sub && <p className="text-mut text-xs mt-0.5">{t.sub}</p>}
        </div>
      ))}
    </div>
  )
}