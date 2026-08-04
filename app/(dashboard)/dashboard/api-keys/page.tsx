'use client'
import { useEffect, useState } from 'react'
import { Plus, Copy, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { toast } from '@/components/ui/Toaster'

type ApiKey = { id: number; label: string; value: string; created: string }

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetch('/api/api-keys').then(r => r.json()).then(setKeys).finally(() => setLoading(false)) }, [])

  const create = async () => {
    const res = await fetch('/api/api-keys', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label: `Ключ ${keys.length + 1}` }) })
    const k = await res.json()
    setKeys(p => [...p, k])
    toast('API-ключ создан', 'Скопируйте и сохраните его — повторно он не отображается')
  }
  const revoke = async (id: number) => {
    await fetch(`/api/api-keys?id=${id}`, { method: 'DELETE' })
    setKeys(p => p.filter(k => k.id !== id))
    toast('Ключ отозван', 'Доступ по этому ключу немедленно прекращён', 'warn')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">API-ключи</h1>
        <Button size="sm" onClick={create}><Plus size={15} /> Новый ключ</Button>
      </div>
      <div className="border border-line rounded-2xl bg-panel overflow-hidden">
        {loading ? <p className="p-6 text-sm text-mut">Загрузка…</p> : keys.length === 0
          ? <p className="p-10 text-center text-dim text-sm">Ключей пока нет — создайте первый.</p>
          : keys.map(k => (
            <div key={k.id} className="flex items-center gap-3.5 border-b border-line last:border-0 px-5 py-4 bg-black/25 flex-wrap hover:bg-accent/[.04] transition">
              <div className="flex-1 min-w-[200px]">
                <span className="font-mono text-[13px] text-accent">{k.value.slice(0, 14)}••••••••{k.value.slice(-4)}</span>
                <small className="block text-dim text-xs pt-0.5">{k.label} · создан {k.created}</small>
              </div>
              <button className="mini" onClick={() => { navigator.clipboard?.writeText(k.value); toast('API-ключ скопирован', 'Храните ключ в секрете') }}><Copy size={13} /> Копировать</button>
              <button className="mini mini-red" onClick={() => revoke(k.id)}><Trash2 size={13} /> Отозвать</button>
            </div>
          ))}
      </div>
      <style jsx>{`.mini{display:inline-flex;align-items:center;gap:6px;background:rgba(79,224,255,.09);border:1px solid rgba(79,224,255,.3);color:#4FE0FF;border-radius:8px;padding:7px 13px;font-size:12px;font-weight:700;font-family:var(--font-jmono),monospace;transition:.2s}.mini:hover{background:rgba(79,224,255,.18);box-shadow:0 0 14px rgba(79,224,255,.2)}.mini-red{background:rgba(255,107,122,.07);border-color:rgba(255,107,122,.3);color:#FF6B7A}.mini-red:hover{background:rgba(255,107,122,.15);box-shadow:0 0 14px rgba(255,107,122,.2)}`}</style>
    </div>
  )
}