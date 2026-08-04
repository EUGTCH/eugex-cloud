'use client'
import { useEffect, useState } from 'react'
import { FileDown } from 'lucide-react'
import ReportModal from '@/components/dashboard/ReportModal'
import { Tx } from '@/components/dashboard/AgentReportDoc'
import { fmt } from '@/lib/constants'
import { useAuth } from '@/lib/auth-context'

const methodLabel = (m: string) => (m === 'card' ? 'Карта МИР' : m === 'sbp' ? 'СБП · QR' : 'Счёт по реквизитам')

export default function TransactionsPage() {
  const { user } = useAuth()
  const [txs, setTxs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<Tx | null>(null)

  useEffect(() => { fetch('/api/transactions').then(r => r.json()).then(setTxs).catch(() => {}).finally(() => setLoading(false)) }, [])

  const toTx = (t: any): Tx => ({
    id: t.id.replace('TX-', 'EA-'), date: new Date(t.date).toLocaleDateString('ru-RU'),
    amount: t.amount, method: methodLabel(t.method), status: t.status === 'success' ? 'Оплачен' : t.status,
    planName: t.planName, userName: user?.name, userEmail: user?.email, userId: user?.id,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">История операций</h1>
        <span className="font-mono text-[10px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5">всего: <b className="text-accent ml-1">{txs.length}</b></span>
      </div>
      <div className="border border-line rounded-2xl bg-panel overflow-x-auto">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="text-left font-mono text-[10.5px] tracking-[.14em] uppercase text-dim border-b border-line">
              {['Дата', 'Отчёт', 'Способ', 'Сумма', 'Статус', ''].map(h => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="px-4 py-8 text-dim">Загрузка…</td></tr>
              : txs.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-dim">Платежей пока нет</td></tr>
              : txs.map(t => (
                <tr key={t.id} className="border-t border-line hover:bg-accent/[.04] transition">
                  <td className="px-4 py-3.5 font-mono text-[#c3cede]">{new Date(t.date).toLocaleDateString('ru-RU')}</td>
                  <td className="px-4 py-3.5 font-mono text-accent">{t.id.replace('TX-', 'EA-')}</td>
                  <td className="px-4 py-3.5 text-[#c3cede]">{methodLabel(t.method)}</td>
                  <td className="px-4 py-3.5"><b>{fmt(t.amount)} ₽</b></td>
                  <td className="px-4 py-3.5"><span className="font-mono text-[10.5px] px-2.5 py-1 rounded-full bg-mint/10 text-mint border border-mint/30">Успешно</span></td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent bg-accent/10 border border-accent/30 rounded-lg px-3 py-1.5 hover:bg-accent/20 hover:shadow-[0_0_14px_rgba(79,224,255,.2)] transition" onClick={() => setReport(toTx(t))}>
                      <FileDown size={13} /> Отчёт PDF
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ReportModal tx={report} onClose={() => setReport(null)} />
    </div>
  )
}