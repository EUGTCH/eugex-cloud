'use client'
import { useEffect, useState } from 'react'
import { FileDown } from 'lucide-react'
import ReportModal from '@/components/dashboard/ReportModal'
import { Tx } from '@/components/dashboard/AgentReportDoc'
import { fmt } from '@/lib/constants'
import { useAuth } from '@/lib/auth-context'

export default function ReportsPage() {
  const { user } = useAuth()
  const [txs, setTxs] = useState<any[]>([])
  const [report, setReport] = useState<Tx | null>(null)

  useEffect(() => { fetch('/api/transactions').then(r => r.json()).then(setTxs).catch(() => {}) }, [])

  return (
    <div className="grid lg:grid-cols-2 gap-[18px]">
      <div className="border border-line rounded-2xl bg-panel overflow-hidden">
        <div className="px-6 py-[18px] border-b border-line"><b className="text-[15px]">Формула распределения платежа</b></div>
        <div className="p-6">
          <div className="border border-dashed border-accent/40 rounded-2xl p-6 bg-accent/[.04] font-mono text-[13.5px] leading-[2.1] text-mut">
            Платёж = <b className="text-white">100%</b><br />
            <span className="text-accent">97%</span> → серверная инфраструктура, хостинг, каналы связи (транзит Принципала)<br />
            <span className="text-mint">3%</span> → агентское вознаграждение (УСН 6%, без НДС)<br />
            <b className="text-white">= Отчёт Агента формируется автоматически в PDF</b>
          </div>
        </div>
      </div>
      <div className="border border-line rounded-2xl bg-panel overflow-hidden">
        <div className="px-6 py-[18px] border-b border-line"><b className="text-[15px]">Электронные отчёты</b></div>
        <div className="p-5">
          {txs.length === 0 ? <p className="text-dim text-sm px-2 py-6 text-center">Отчёты появятся после первой оплаты.</p> : txs.slice(0, 6).map(t => {
            const tx: Tx = {
              id: t.id.replace('TX-', 'EA-'), date: new Date(t.date).toLocaleDateString('ru-RU'), amount: t.amount,
              method: t.method === 'card' ? 'Карта МИР' : t.method === 'sbp' ? 'СБП · QR' : 'Счёт', status: 'Оплачен',
              planName: t.planName, userName: user?.name, userEmail: user?.email, userId: user?.id,
            }
            return (
              <div key={t.id} className="flex items-center gap-3.5 border border-line rounded-xl px-[18px] py-4 mb-3 bg-black/25 flex-wrap hover:border-accent/30 transition">
                <div className="flex-1 min-w-[180px]">
                  <span className="font-mono text-[13px] text-accent">{tx.id}</span>
                  <small className="block text-dim text-xs pt-0.5">{tx.date} · {fmt(tx.amount)} ₽ · инфраструктура {fmt(Math.round(tx.amount * .97))} ₽ · вознаграждение {fmt(tx.amount - Math.round(tx.amount * .97))} ₽</small>
                </div>
                <button className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent bg-accent/10 border border-accent/30 rounded-lg px-3 py-1.5 hover:bg-accent/20 transition" onClick={() => setReport(tx)}>
                  <FileDown size={13} /> Скачать PDF
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <ReportModal tx={report} onClose={() => setReport(null)} />
    </div>
  )
}