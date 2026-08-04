'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, KeyRound, ReceiptText, FileBadge, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/components/ui/Toaster'

const links = [
  { href: '/dashboard', label: 'Обзор', icon: LayoutGrid },
  { href: '/dashboard/api-keys', label: 'API-ключи', icon: KeyRound },
  { href: '/dashboard/transactions', label: 'История транзакций', icon: ReceiptText },
  { href: '/dashboard/reports', label: 'Отчёты Агента', icon: FileBadge },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  return (
    <aside className="border-r border-line bg-[#090d17]/92 lg:sticky lg:top-0 lg:h-screen p-4 flex lg:flex-col gap-1 overflow-x-auto">
      <Link href="/" className="hidden lg:flex items-center gap-3 px-3 mb-8 shrink-0">
        <span className="font-display font-bold">EUGEX <span className="font-mono text-[9px] tracking-[.42em] text-accent font-medium">CLOUD</span></span>
      </Link>
      {links.map(l => (
        <Link key={l.href} href={l.href}
          className={cn('flex items-center gap-3 px-3.5 py-3 rounded-xl text-[14.5px] font-semibold whitespace-nowrap transition shrink-0',
            pathname === l.href ? 'text-accent bg-accent/10 shadow-[inset_3px_0_0_#4FE0FF]' : 'text-mut hover:text-white hover:bg-white/5')}>
          <l.icon size={18} strokeWidth={1.8} />{l.label}
        </Link>
      ))}
      <button onClick={() => { logout(); toast('Вы вышли из аккаунта', 'До встречи в Eugex Cloud!'); router.push('/') }}
        className="lg:mt-auto flex items-center gap-3 px-3.5 py-3 rounded-xl text-[14.5px] font-semibold text-mut hover:text-coral hover:bg-white/5 transition shrink-0 ml-auto lg:ml-0 lg:border-t lg:border-line lg:pt-4">
        <LogOut size={18} strokeWidth={1.8} />Выйти
      </button>
    </aside>
  )
}