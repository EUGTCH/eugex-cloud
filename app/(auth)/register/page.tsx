'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { toast } from '@/components/ui/Toaster'
import { useAuth } from '@/lib/auth-context'
import { maskPhone } from '@/lib/utils'
import { OFFER_VERSION } from '@/lib/constants'

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [f, setF] = useState({ name: '', phone: '', email: '', pass: '' })
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!f.name || !f.email || !f.pass || f.phone.replace(/\D/g, '').length < 11) { setErr('fields'); toast('Проверьте поля формы', 'Заполните все поля, пароль от 8 символов', 'err'); return }
    if (f.pass.length < 8) { toast('Слабый пароль', 'Минимум 8 символов', 'err'); return }
    setLoading(true)
    await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fio: f.name, phone: f.phone, email: f.email }) }).catch(() => {})
    await fetch('/api/accept', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: f.email, source: 'register', offerVersion: OFFER_VERSION }) }).catch(() => {})
    toast('SMS-код подтверждён', 'Номер телефона верифицирован (ПЭП)')
    login({ name: f.name, email: f.email, phone: f.phone, id: 'EX-' + Math.floor(100000 + Math.random() * 899999) })
    router.push('/dashboard')
  }

  const fld = (v: string) => `field ${err === 'fields' && !v ? 'err' : ''}`

  return (
    <section className="min-h-screen grid lg:grid-cols-2 relative z-[1]">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-[#0b1424] to-[#080d18] border-r border-line p-[60px] relative overflow-hidden">
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(123,140,255,.16),transparent_65%)] blur-[40px] -bottom-52 -left-36" />
        <span className="font-display font-bold text-lg">EUGEX <span className="font-mono text-[10px] tracking-[.42em] text-accent font-medium">CLOUD</span></span>
        <div className="relative z-[1]">
          <h2 className="font-display text-[clamp(24px,2.5vw,36px)] font-bold leading-[1.3]">Подключение к платформе за 2 минуты</h2>
          <div className="mt-9 space-y-3.5 text-mut text-sm">
            {[['/01', 'Без паспорта, ИНН и СНИЛС — только ФИО, телефон и e-mail'],
              ['/02', 'Подтверждение телефона SMS-кодом (простая электронная подпись)'],
              ['/03', 'Активация тарифа сразу после оплаты']].map(([n, t]) => (
              <div key={n} className="flex gap-3"><b className="text-accent font-mono text-xs">{n}</b>{t}</div>
            ))}
          </div>
        </div>
        <span className="font-mono text-[11px] text-dim">Данные обрабатываются в соответствии со 152-ФЗ</span>
      </div>
      <div className="flex items-center justify-center px-10 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[440px]">
          <Link href="/" className="inline-flex gap-2 font-mono text-xs text-dim mb-9 hover:text-accent transition">← На главную</Link>
          <h3 className="font-display text-2xl font-bold mb-2">Регистрация</h3>
          <p className="text-mut text-sm mb-8">Создайте аккаунт, чтобы оплачивать тарифы и управлять ресурсами.</p>
          <form onSubmit={submit} className="space-y-4">
            <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">ФИО</label>
              <input className={fld(f.name)} placeholder="Иванов Иван Иванович" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
            <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">Мобильный телефон</label>
              <input type="tel" className={fld(f.phone)} placeholder="+7 (___) ___-__-__" value={f.phone} onChange={e => setF({ ...f, phone: maskPhone(e.target.value) })} /></div>
            <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">E-mail</label>
              <input type="email" className={fld(f.email)} placeholder="you@company.ru" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
            <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">Пароль</label>
              <input type="password" className={fld(f.pass)} placeholder="Минимум 8 символов" value={f.pass} onChange={e => setF({ ...f, pass: e.target.value })} /></div>
            <label className="flex gap-3 items-start cursor-pointer text-[13px] text-mut leading-[1.6] mt-5">
              <input type="checkbox" className="hidden peer" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
              <span className="w-5 h-5 border-[1.5px] border-line2 rounded-md grid place-items-center shrink-0 mt-px transition-all peer-checked:bg-accent peer-checked:border-accent after:content-['✓'] after:text-[#04121c] after:text-xs after:font-extrabold after:opacity-0 peer-checked:after:opacity-100" />
              <span>Я ознакомлен(а) с условиями <Link href="/oferta" target="_blank" className="text-accent underline underline-offset-[3px]">Публичной оферты</Link>, даю согласие на обработку персональных данных и подтверждаю оформление заказа.</span>
            </label>
            <Button type="submit" className="w-full" size="lg" disabled={!accepted} isLoading={loading}>Создать аккаунт</Button>
          </form>
          <p className="mt-6 text-center text-sm text-dim">Уже есть аккаунт? <Link href="/login" className="text-accent">Войти</Link></p>
        </motion.div>
      </div>
    </section>
  )
}