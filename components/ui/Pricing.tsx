'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from './Button'
import PaymentModal from './PaymentModal'
import { useAuth } from '@/lib/auth-context'
import { toast } from './Toaster'
import { fmt } from '@/lib/constants'

export default function Pricing() {
  const { user } = useAuth()
  const router = useRouter()
  const [pay, setPay] = useState<{ plan: string; amount: number } | null>(null)
  const [custom, setCustom] = useState('')

  const handlePay = (amount: number, plan: string) => {
    if (!user) {
      // ФИКСС: оплата строго внутри ЛК — сохраняем выбор и отправляем на регистрацию
      sessionStorage.setItem('eugex_pending_pay', JSON.stringify({ amount, plan }))
      toast('Оплата доступна в Личном кабинете', 'Войдите или зарегистрируйтесь — мы сохранили ваш выбор тарифа', 'warn')
      router.push('/register')
      return
    }
    setPay({ amount, plan })
  }

  const payCustom = () => {
    const amount = parseInt(custom.replace(/\D/g, ''), 10) || 0
    if (amount < 1000) { toast('Введите сумму счёта', 'Минимальная сумма для индивидуального тарифа — 1 000 ₽', 'warn'); return }
    handlePay(amount, 'Enterprise')
  }

  const plans = [
    { name: 'Starter', price: 50000, desc: 'Базовый доступ к платформе для небольших проектов и приватных задач.', features: ['До 500 Гб обрабатываемых данных', 'Стандартный API-канал', 'Панель телеметрии и мониторинг', 'Отчёты Агента в Личном кабинете', 'Поддержка по e-mail'], hi: false },
    { name: 'Business', price: 150000, desc: 'Расширенный пакет мощностей для команд и растущих нагрузок.', features: ['Приоритетная скорость обработки', 'До 2 Тб обрабатываемых данных', 'Приоритетный API-канал', 'Поддержка 24/7', 'Персональный менеджер'], hi: true },
  ]

  return (
    <section id="pricing" className="pb-[110px] relative z-[1]">
      <div className="max-w-[1220px] mx-auto px-7">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="kicker mb-5"><i className="not-italic text-dim">04</i> Тарифы</div>
          <h2 className="font-display font-bold text-[clamp(26px,2.9vw,40px)]">Прозрачные тарифы в рублях</h2>
          <p className="text-mut text-[16.5px] max-w-[640px] mt-[18px] leading-[1.75]">Тарифы для разработчиков и IT-команд. Оплата только в Личном кабинете: МИР, СБП или счёт по реквизитам.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }}
              className={`relative rounded-[20px] p-9 flex flex-col border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(0,0,0,.45)] ${p.hi ? 'border-accent/50 bg-gradient-to-b from-[#12233d] to-[#0c1425] shadow-[0_0_50px_rgba(79,224,255,.1)]' : 'border-line bg-gradient-to-b from-panel2 to-panel hover:border-accent/35'}`}>
              {p.hi && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-[#04121c] font-mono text-[10.5px] font-bold tracking-[.16em] uppercase px-4 py-1.5 rounded-full shadow-[0_6px_20px_rgba(79,224,255,.4)]">Выбор бизнеса</span>}
              <div className="font-mono text-xs tracking-[.24em] uppercase text-mut">{p.name}</div>
              <div className="font-display font-bold text-[34px] mt-4 mb-1">{fmt(p.price)} <small className="text-sm text-dim font-sans font-medium">₽ / мес</small></div>
              <p className="text-[13.5px] text-mut mb-6 min-h-[42px]">{p.desc}</p>
              <ul className="space-y-[11px] mb-8 flex-1">
                {p.features.map(f => <li key={f} className="text-sm text-[#c3cede] flex gap-2.5"><span className="text-mint font-bold">✓</span>{f}</li>)}
              </ul>
              <Button variant={p.hi ? 'primary' : 'ghost'} className="w-full" onClick={() => handlePay(p.price, p.name)}>Оплатить</Button>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .24 }}
            className="rounded-[20px] p-9 flex flex-col border border-line bg-gradient-to-b from-panel2 to-panel hover:border-accent/35 hover:-translate-y-1.5 transition-all duration-300">
            <div className="font-mono text-xs tracking-[.24em] uppercase text-mut">Enterprise / Custom</div>
            <div className="font-display font-bold text-[24px] mt-4 mb-1 pt-2.5">Произвольная сумма</div>
            <p className="text-[13.5px] text-mut mb-6">Индивидуальная конфигурация ресурсов под уникальные задачи.</p>
            <div className="flex flex-col gap-3 flex-1">
              <label className="font-mono text-[10.5px] tracking-[.16em] text-dim uppercase">Согласованная сумма счёта</label>
              <div className="relative">
                <input value={custom} onChange={e => setCustom(e.target.value.replace(/\D/g, '').replace(/^0+/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '))}
                  inputMode="numeric" placeholder="250 000" className="field !font-display !text-[19px] !font-semibold !pr-12" />
                <em className="not-italic absolute right-4 top-1/2 -translate-y-1/2 text-accent font-display text-lg">₽</em>
              </div>
              <p className="text-xs text-dim leading-relaxed">Введите сумму, согласованную с менеджером, — доступ активируется моментально после оплаты.</p>
              <Button variant="ghost" className="w-full mt-auto" onClick={payCustom}>Оплатить счёт</Button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mt-10 text-[13.5px] text-mut flex-wrap">
          <span className="font-mono text-[11.5px] uppercase tracking-wider border border-line rounded-full px-3.5 py-1.5 bg-panel/60">Принимаем: <b className="text-accent font-semibold">МИР</b></span>
          <span className="font-mono text-[11.5px] uppercase tracking-wider border border-line rounded-full px-3.5 py-1.5 bg-panel/60"><b className="text-accent font-semibold">СБП</b> · QR-код, комиссия 0,4–0,7%</span>
          <span className="font-mono text-[11.5px] uppercase tracking-wider border border-line rounded-full px-3.5 py-1.5 bg-panel/60">Безналичный счёт по реквизитам</span>
        </motion.div>
      </div>
      {pay && <PaymentModal open onClose={() => setPay(null)} plan={pay.plan} amount={pay.amount} userId={user?.id || ''} />}
    </section>
  )
}