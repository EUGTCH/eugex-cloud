'use client'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { AgentReportDoc, Tx } from './AgentReportDoc'

export default function ReportModal({ tx, onClose }: { tx: Tx | null; onClose: () => void }) {
  if (!tx) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-[640px] max-h-[92vh] overflow-y-auto bg-gradient-to-b from-panel2 to-[#0b1120] border border-line2 rounded-3xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="kicker mb-2.5">Электронный документ</div>
            <h3 className="font-display text-[21px] font-bold">Отчёт Агента <span className="text-accent font-mono text-lg">№ {tx.id}</span></h3>
          </div>
          <button className="w-[34px] h-[34px] rounded-[10px] border border-line2 text-mut hover:text-coral hover:border-coral hover:rotate-90 transition" onClick={onClose}><X size={17} className="mx-auto" /></button>
        </div>
        <div className="rounded-xl overflow-hidden max-h-[52vh] overflow-y-auto"><AgentReportDoc tx={tx} /></div>
        <Button className="w-full mt-5" onClick={() => window.print()}>Печать / Сохранить как PDF</Button>
        <div className="print-area"><AgentReportDoc tx={tx} /></div>
      </div>
    </div>
  )
}