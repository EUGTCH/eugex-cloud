'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import UsageChart from '@/components/dashboard/UsageChart'
import PaymentModal from '@/components/ui/PaymentModal'
import Button from '@/components/ui/Button'
import { useAuth } from '@/lib/auth-context'

export default function DashboardHome() {
  const { user } = useAuth()
  const [pending, setPending] = useState<{ amount: number; plan: string } | null>(null)
  const [bars, setBars] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('eugex_pending_pay')
    if (raw) { sessionStorage.removeItem('eugex_pending_pay'); setPending(JSON.parse(raw)) }
    setTimeout(() => setBars(true), 200)
  }, [])

  const cards = [
    ['Активная подписка', 'Business', '● Активна · продление 03.09.2026', 72],
    ['Баланс ИТ-ресурсов', '24 500 ₽', 'Хватит ≈ на 5 дней при текущей нагрузке', 16],
    ['Израсходовано ресурсов', '62%', '1.24 ТБ данных · 8.4 млн API-запросов', 62],
  ]

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-[18px] mb-[18px]">
        {cards.map(([label, big, sub, w], i) => (
          <motion.div key={label as string} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}
            className="border border-line rounded-2xl bg-gradient-to-b from-panel2 to-panel p-[26px] hover:border-accent/30 hover:-translate-y-1 transition-all">
            <small className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim">{label}</small>
            <div className="font-display text-[28px] font-bold mt-3.5 mb-1.5">{big}</div>
            <div className={`text-[13px] ${i === 0 ? 'text-mint' : 'text-mut'}`}>{sub}</div>
            <div className="h-[7px] rounded bg-white/10 overflow-hidden mt-3.5">
              <i className="block h-full rounded bg-gradient-to-r from-accent to-indigo2 transition-all duration-[1300ms]" style={{ width: bars ? `${w}%` : 0 }} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-[18px]">
        <div className="border border-line rounded-2xl bg-panel overflow-hidden">
          <div className="flex items-center justify-between px-6 py-[18px] border-b border-line">
            <b className="text-[15px]">Потребление ресурсов · 30 дней</b>
            <span className="font-mono text-[10px] uppercase tracking-wider text-mut border border-line rounded-full px-3 py-1">ГБ / сутки</span>
          </div>
          <div className="p-6"><UsageChart /></div>
        </div>
        <div className="border border-line rounded-2xl bg-panel overflow-hidden">
          <div className="px-6 py-[18px] border-b border-line"><b className="text-[15px]">Быстрые действия</b></div>
          <div className="p-6 flex flex-col gap-2.5">
            {pending && <p className="text-xs text-amber2 font-mono mb-1">Отложенный тариф «{pending.plan}» — оплата открыта автоматически</p>}
            <Button size="sm" onClick={() => setPending({ amount: 150000, plan: 'Business' })}>Пополнить баланс</Button>
            <Button variant="ghost" size="sm">Создать API-ключ</Button>
            <Button variant="ghost" size="sm">Скачать последний отчёт (PDF)</Button>
            <p className="mt-2 text-xs text-dim leading-relaxed">Доступ к оплате предоставляется исключительно авторизованным пользователям в рамках Агентской оферты.</p>
          </div>
        </div>
      </div>
      {pending && user && <PaymentModal open onClose={() => setPending(null)} plan={pending.plan} amount={pending.amount} userId={user.id} userName={user.name} userEmail={user.email} />}
    </div>
  )
}