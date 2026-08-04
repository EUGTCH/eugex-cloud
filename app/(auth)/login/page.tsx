'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { toast } from '@/components/ui/Toaster'
import { useAuth } from '@/lib/auth-context'
import { OFFER_VERSION } from '@/lib/constants'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [accepted, setAccepted] = useState(false) // ФИКСС: на v3 чекбокса на login не было
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accepted || !email || !pass) { setErr('Заполните все поля и подтвердите акцепт'); return }
    setLoading(true)
    await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }).catch(() => {})
    await fetch('/api/accept', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: email, source: 'login', offerVersion: OFFER_VERSION }) }).catch(() => {})
    const stored = localStorage.getItem('eugex_user')
    const base = stored ? JSON.parse(stored) : { name: 'Демо Пользователь', phone: '+7 (921) 000-00-00', id: 'EX-' + Math.floor(100000 + Math.random() * 899999) }
    login({ ...base, email })
    toast('Вход выполнен', 'Добро пожаловать в Eugex Cloud')
    router.push('/dashboard')
  }

  return (
    <section className="min-h-screen grid lg:grid-cols-2 relative z-[1]">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-[#0b1424] to-[#080d18] border-r border-line p-[60px] relative overflow-hidden">
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(79,224,255,.14),transparent_65%)] blur-[40px] -bottom-52 -left-36" />
        <span className="font-display font-bold text-lg">EUGEX <span className="font-mono text-[10px] tracking-[.42em] text-accent font-medium">CLOUD</span></span>
        <div className="relative z-[1]">
          <h2 className="font-display text-[clamp(24px,2.5vw,36px)] font-bold leading-[1.3] max-w-[420px]">Личный кабинет — центр управления вашей инфраструктурой</h2>
          <div className="mt-9 space-y-3.5 text-mut text-sm">
            {['Телеметрия ресурсов в реальном времени', 'API-ключи: создание и отзыв', 'Отчёты Агента — автоматический PDF', 'Оплата МИР, СБП и по счёту'].map(f => (
              <div key={f} className="flex gap-3"><b className="text-accent font-mono text-xs">◆</b>{f}</div>
            ))}
          </div>
        </div>
        <span className="font-mono text-[11px] text-dim">eugtch@yandex.ru · +7 (921) 908-57-97</span>
      </div>
      <div className="flex items-center justify-center px-10 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[440px]">
          <Link href="/" className="inline-flex gap-2 font-mono text-xs text-dim mb-9 hover:text-accent transition">← На главную</Link>
          <h3 className="font-display text-2xl font-bold mb-2">Вход в систему</h3>
          <p className="text-mut text-sm mb-8">Оплата и управление ресурсами доступны только после входа.</p>
          <form onSubmit={submit} className="space-y-4">
            <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">E-mail</label>
              <input type="email" className={`field ${err && !email ? 'err' : ''}`} placeholder="you@company.ru" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">Пароль</label>
              <input type="password" className={`field ${err && !pass ? 'err' : ''}`} placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} /></div>
            <label className="flex gap-3 items-start cursor-pointer text-[13px] text-mut leading-[1.6] mt-5">
              <input type="checkbox" className="hidden peer" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
              <span className="w-5 h-5 border-[1.5px] border-line2 rounded-md grid place-items-center shrink-0 mt-px transition-all peer-checked:bg-accent peer-checked:border-accent after:content-['✓'] after:text-[#04121c] after:text-xs after:font-extrabold after:opacity-0 peer-checked:after:opacity-100" />
              <span>Я ознакомлен(а) с условиями <Link href="/oferta" target="_blank" className="text-accent underline underline-offset-[3px]">Публичной оферты</Link>, даю согласие на обработку персональных данных и подтверждаю оформление заказа.</span>
            </label>
            <Button type="submit" className="w-full" size="lg" disabled={!accepted} isLoading={loading}>Войти</Button>
          </form>
          <p className="mt-6 text-center text-sm text-dim">Нет аккаунта? <Link href="/register" className="text-accent">Зарегистрироваться</Link></p>
        </motion.div>
      </div>
    </section>
  )
}