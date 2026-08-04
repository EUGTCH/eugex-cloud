'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, FileText, Shield, CreditCard, ChevronDown } from 'lucide-react'
import Button from './Button'
import { useAuth } from '@/lib/auth-context'

const docs = [
  { href: '/oferta', icon: FileText, t: 'Публичная оферта', s: 'Агентский договор · ред. 03.08.2026' },
  { href: '/privacy', icon: Shield, t: 'Политика конфиденциальности', s: 'Обработка данных · 152-ФЗ' },
  { href: '/payment-terms', icon: CreditCard, t: 'Условия оплаты и возврата', s: 'МИР, СБП, безналичный расчёт' },
]

export default function Header() {
  const pathname = usePathname()
  const hide = pathname?.startsWith('/dashboard') || pathname === '/login' || pathname === '/register'
  const [sc, setSc] = useState(false)
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const f = () => setSc(scrollY > 10)
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  const nav = [
    { href: '/#features', label: 'Возможности' },
    { href: '/#about', label: 'О платформе' },
    { href: '/#pricing', label: 'Тарифы' },
    { href: '/#faq', label: 'FAQ' },
  ]

  if (hide) return null

  const Logo = (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <span className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#0f2438] to-[#101a33] border border-line2 grid place-items-center shadow-[0_0_18px_rgba(79,224,255,.25)]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2.5" width="14" height="2.6" rx="1.3" fill="#4FE0FF" />
          <rect x="2" y="7.7" width="9" height="2.6" rx="1.3" fill="#7B8CFF" />
          <rect x="2" y="12.9" width="14" height="2.6" rx="1.3" fill="#4FE0FF" />
        </svg>
      </span>
      <span className="font-display font-bold text-[17px] leading-none tracking-wide">EUGEX<small className="block font-mono font-medium text-[9px] tracking-[.42em] text-accent mt-1">CLOUD</small></span>
    </Link>
  )

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b transition-all ${sc ? 'bg-ink/80 backdrop-blur-xl border-line' : 'border-transparent'}`}>
      <div className="max-w-[1220px] mx-auto px-7 flex items-center gap-9 h-[74px]">
        {Logo}
        <nav className="hidden lg:flex items-center gap-1.5 ml-auto">
          {nav.map(l => <Link key={l.href} href={l.href} className="px-3.5 py-2 text-sm font-semibold text-mut hover:text-white hover:bg-white/5 rounded-lg transition">{l.label}</Link>)}
          <div className="relative group">
            <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-mut hover:text-white hover:bg-white/5 rounded-lg transition">
              Документы <ChevronDown size={13} className="opacity-60" />
            </button>
            <div className="absolute top-full right-0 pt-2.5 min-w-[290px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all">
              <div className="bg-panel border border-line2 rounded-2xl p-2 shadow-2xl">
                {docs.map(d => (
                  <Link key={d.href} href={d.href} className="flex gap-3 p-3 rounded-lg hover:bg-accent/5 transition">
                    <d.icon size={17} className="text-accent mt-0.5 shrink-0" />
                    <span><b className="text-sm block">{d.t}</b><span className="text-xs text-dim">{d.s}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className={`flex gap-2.5 items-center ${open ? 'ml-auto' : ''} ${!open ? 'lg:ml-0 ml-auto' : ''}`}>
          {user
            ? <Link href="/dashboard"><Button size="sm">Кабинет</Button></Link>
            : <Link href="/login"><Button variant="ghost" size="sm">Войти</Button></Link>}
          <Link href="/#pricing" className="hidden sm:block"><Button size="sm">Подключить</Button></Link>
          <button className="lg:hidden text-mut hover:text-white p-1" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-panel/95 backdrop-blur-xl border-b border-line px-5 py-4 flex flex-col gap-1">
          {[...nav, ...docs.map(d => ({ href: d.href, label: d.t }))].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-mut hover:text-white py-2.5 px-2 rounded text-sm font-semibold">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}