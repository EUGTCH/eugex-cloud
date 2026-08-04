'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Smartphone, FileText, Lock, Copy } from 'lucide-react'
import Button from './Button'
import QRCode from './QRCode'
import ReportModal from '@/components/dashboard/ReportModal'
import { InvoiceDoc, Tx } from '@/components/dashboard/AgentReportDoc'
import { COMPANY, fmt, OFFER_VERSION } from '@/lib/constants'
import { toast } from './Toaster'
import { cn } from '@/lib/utils'

type Props = { open: boolean; onClose: () => void; plan: string; amount: number; userId: string; userName?: string; userEmail?: string }

export default function PaymentModal({ open, onClose, plan, amount, userId, userName, userEmail }: Props) {
  const [method, setMethod] = useState<'card' | 'sbp' | 'invoice'>('card')
  const [accepted, setAccepted] = useState(false)
  const [autoRenew, setAutoRenew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<Tx | null>(null)
  const [report, setReport] = useState<Tx | null>(null)
  const [printInv, setPrintInv] = useState(false)
  const [card, setCard] = useState({ num: '', exp: '', cvc: '', name: '' })

  if (!open) return null

  const logAccept = () => fetch('/api/accept', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, method, amount, offerVersion: OFFER_VERSION }),
  }).catch(() => {})

  const onAccept = (v: boolean) => { setAccepted(v); if (v) logAccept() }

  const submit = async () => {
    if (!accepted) return
    if (method === 'card') {
      if (card.num.replace(/\D/g, '').length !== 16 || card.exp.replace(/\D/g, '').length !== 4 || card.cvc.length !== 3) {
        toast('Проверьте данные карты', 'Введите полный номер, срок действия и CVC', 'err'); return
      }
    }
    setLoading(true)
    try {
      const res = await fetch('/api/payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plan, amount, method, autoRenew, ofertaAccepted: true }),
      })
      const data = await res.json()
      if (data.success) {
        const tx: Tx = {
          id: data.transactionId, date: new Date().toLocaleDateString('ru-RU'),
          amount, method: { card: 'Карта МИР', sbp: 'СБП · QR', invoice: 'Счёт по реквизитам' }[method],
          status: 'Оплачен', planName: plan, userName, userEmail, userId,
        }
        await fetch('/api/transactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, method: method === 'card' ? 'card' : method === 'sbp' ? 'sbp' : 'invoice', planName: plan }) }).catch(() => {})
        setSuccess(tx)
        toast('Оплата принята', 'Доступ к платформе активирован · Заказ №' + tx.id)
      }
    } catch { toast('Ошибка сети', 'Попробуйте ещё раз', 'err') }
    finally { setLoading(false) }
  }

  const genInvoice = () => { if (!accepted) { toast('Требуется акцепт оферты', 'Отметьте согласие с условиями Публичной оферты', 'warn'); return } logAccept(); setPrintInv(true); setTimeout(() => window.print(), 120) }

  if (success) return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
        <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-b from-panel2 to-[#0b1120] border border-line2 rounded-3xl max-w-md w-full p-10 text-center shadow-2xl">
          <div className="w-[88px] h-[88px] mx-auto rounded-full bg-mint/10 border border-mint/40 grid place-items-center mb-6 shadow-[0_0_50px_rgba(62,230,168,.25)]">
            <svg viewBox="0 0 24 24" className="w-[42px] h-[42px] stroke-mint" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><motion.path d="M4 12.5l5 5L20 6.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .25, duration: .6 }} /></svg>
          </div>
          <h3 className="font-display text-[22px] font-bold mb-2.5">Платёж принят</h3>
          <p className="text-mut text-sm mb-7">Доступ к вычислительным ресурсам активирован.<br />Отчёт Агента №<span className="font-mono text-accent">{success.id}</span> сформирован автоматически.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={() => setReport(success)}>Скачать Отчёт Агента (PDF)</Button>
            <Button variant="ghost" onClick={onClose}>Вернуться в кабинет</Button>
          </div>
        </motion.div>
      </div>
      <ReportModal tx={report} onClose={() => setReport(null)} />
    </>
  )

  const tabs = [
    { id: 'card', label: 'Карта МИР', icon: CreditCard },
    { id: 'sbp', label: 'СБП · QR', icon: Smartphone },
    { id: 'invoice', label: 'По реквизитам', icon: FileText },
  ] as const

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ scale: .95, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()}
          className="w-full max-w-[560px] max-h-[92vh] overflow-y-auto bg-gradient-to-b from-panel2 to-[#0b1120] border border-line2 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="kicker mb-2.5">Мультиоплата · SSL</div>
              <h3 className="font-display text-[21px] font-bold">Оплата тарифа <span className="text-accent">{plan}</span></h3>
              <p className="mt-2.5 text-sm text-mut">К оплате: <b className="font-display text-[30px] text-white ml-1">{fmt(amount)} <i className="not-italic text-accent text-[22px]">₽</i></b>
                <span className="block font-mono text-[11px] mt-1">≈ инфраструктура 97% · вознаграждение 3%</span></p>
            </div>
            <button className="w-[34px] h-[34px] rounded-[10px] border border-line2 text-mut hover:text-coral hover:border-coral hover:rotate-90 transition" onClick={onClose}><X size={17} className="mx-auto" /></button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setMethod(t.id)}
                className={cn('rounded-xl py-3 px-2 text-center text-[12.5px] font-bold border transition-all', method === t.id ? 'border-accent text-accent bg-accent/10 shadow-[0_0_18px_rgba(79,224,255,.12)]' : 'border-line text-mut bg-black/30 hover:text-white')}>
                <t.icon size={22} className="mx-auto mb-1.5" strokeWidth={1.7} />{t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={method} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
              {method === 'card' && (
                <div>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="col-span-2"><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">Номер карты</label>
                      <input className="field" inputMode="numeric" placeholder="2200 0000 0000 0000" maxLength={19} value={card.num}
                        onChange={e => setCard({ ...card, num: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() })} /></div>
                    <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">ММ / ГГ</label>
                      <input className="field" inputMode="numeric" placeholder="08 / 28" maxLength={7} value={card.exp}
                        onChange={e => { const d = e.target.value.replace(/\D/g, '').slice(0, 4); setCard({ ...card, exp: d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d }) }} /></div>
                    <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">CVC</label>
                      <input className="field" type="password" inputMode="numeric" placeholder="•••" maxLength={3} value={card.cvc}
                        onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '') })} /></div>
                    <div className="col-span-2"><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">Имя владельца</label>
                      <input className="field uppercase" placeholder="IVAN IVANOV" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} /></div>
                  </div>
                  <p className="flex items-center gap-2 font-mono text-[11.5px] text-dim mt-3.5"><Lock size={13} className="text-mint" />Данные передаются по SSL через защищённый платёжный шлюз · PCI DSS</p>
                </div>
              )}
              {method === 'sbp' && (
                <div className="flex gap-6 items-center flex-wrap justify-center py-2">
                  <QRCode seed={amount + plan.length} />
                  <div className="flex-1 min-w-[200px]">
                    <b className="text-[15px]">Отсканируйте QR-код</b>
                    <p className="text-[13px] text-mut mt-2 leading-[1.65]">С мобильного — deep-link в приложение вашего банка. С ПК — наведите камеру телефона.</p>
                    <Button variant="ghost" size="sm" className="mt-4" onClick={() => { navigator.clipboard?.writeText(`https://pay.eugex.cloud/sbp/${userId}/${amount}`); toast('Ссылка скопирована', 'Откройте её на телефоне для перехода в приложение банка') }}>
                      <Copy size={14} /> Скопировать ссылку
                    </Button>
                    <p className="flex items-center gap-2 font-mono text-[11.5px] text-dim mt-4"><Lock size={13} className="text-mint" />Комиссия СБП: 0,4–0,7% · зачисление мгновенно</p>
                  </div>
                </div>
              )}
              {method === 'invoice' && (
                <div>
                  <div className="space-y-2 mb-5">
                    {[['Получатель', COMPANY.name], ['ИНН', COMPANY.inn], ['ОГРНИП', COMPANY.ogrn], ['Банк', COMPANY.bank],
                      ['Назначение', `Оплата ИТ-услуг по Агентской оферте (ID №${userId}), в т.ч. вознаграждение 3%. Без НДС.`]].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3.5 text-[13.5px] border-b border-dashed border-line pb-2">
                        <span className="text-dim">{k}</span><b className="font-mono text-[12.5px] font-medium text-right">{v}</b>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full" onClick={genInvoice}>Сформировать счёт на оплату (PDF)</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="h-px bg-line my-6" />
          <label className="flex gap-3 items-start cursor-pointer text-[12.5px] text-mut leading-[1.6]">
            <input type="checkbox" className="hidden peer" checked={autoRenew} onChange={e => setAutoRenew(e.target.checked)} />
            <span className="w-5 h-5 border-[1.5px] border-line2 rounded-md grid place-items-center shrink-0 mt-px transition-all peer-checked:bg-accent peer-checked:border-accent peer-checked:shadow-[0_0_14px_rgba(79,224,255,.4)] after:content-['✓'] after:text-[#04121c] after:text-xs after:font-extrabold after:opacity-0 after:scale-50 after:transition peer-checked:after:opacity-100 peer-checked:after:scale-100" />
            <span>Согласен на автоматическое списание средств за следующий расчётный период согласно условиям Оферты <span className="font-mono text-dim">(необязательно)</span></span>
          </label>
          <label className="flex gap-3 items-start cursor-pointer text-[13px] text-mut leading-[1.6] mt-4">
            <input type="checkbox" className="hidden peer" checked={accepted} onChange={e => onAccept(e.target.checked)} />
            <span className="w-5 h-5 border-[1.5px] border-line2 rounded-md grid place-items-center shrink-0 mt-px transition-all peer-checked:bg-accent peer-checked:border-accent peer-checked:shadow-[0_0_14px_rgba(79,224,255,.4)] after:content-['✓'] after:text-[#04121c] after:text-xs after:font-extrabold after:opacity-0 after:scale-50 after:transition peer-checked:after:opacity-100 peer-checked:after:scale-100" />
            <span>Я ознакомлен(а) с условиями <Link href="/oferta" target="_blank" className="text-accent underline underline-offset-[3px]">Публичной оферты</Link>, даю согласие на обработку персональных данных и подтверждаю оформление заказа.</span>
          </label>
          <Button className="w-full mt-6" size="lg" disabled={!accepted} isLoading={loading} onClick={submit}>
            {method === 'invoice' ? 'Перейти к счёту' : `Оплатить ${fmt(amount)} ₽`}
          </Button>
        </motion.div>
      </div>
      {printInv && <div className="print-area"><InvoiceDoc amount={amount} userId={userId} userName={userName || ''} planName={plan} /></div>}
      {printInv && <style>{`@media print { .print-area:last-of-type { display: block } }`}</style>}
    </>
  )
}