'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import PaymentModal from '@/components/ui/PaymentModal'
import Button from '@/components/ui/Button'
import { useAuth } from '@/lib/auth-context'

const titles: Record<string, string> = {
  '/dashboard': 'Обзор', '/dashboard/api-keys': 'API-ключи', '/dashboard/transactions': 'История транзакций',
  '/dashboard/reports': 'Отчёты Агента', '/dashboard/settings': 'Настройки',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [payOpen, setPayOpen] = useState(false)

  useEffect(() => { if (ready && !user) router.replace('/login') }, [ready, user, router])
  if (!ready || !user) return <div className="min-h-screen grid place-items-center font-mono text-dim text-sm relative z-[1]">Проверка сессии…</div>

  return (
    <div className="grid lg:grid-cols-[250px_1fr] min-h-screen relative z-[1]">
      <DashboardSidebar />
      <div className="pb-16">
        <div className="flex items-center gap-4 px-8 py-5 border-b border-line sticky top-0 bg-ink/85 backdrop-blur-xl z-10">
          <h4 className="font-display text-[17px] font-semibold">{titles[pathname] || 'Кабинет'}</h4>
          <Button size="sm" className="ml-auto" onClick={() => setPayOpen(true)}>＋ Пополнить баланс</Button>
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-[11px] bg-gradient-to-br from-accent to-indigo2 grid place-items-center font-display font-bold text-[13px] text-[#04121c]">
              {user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div><b className="text-[13.5px] block leading-tight">{user.name.split(' ').slice(0, 2).join(' ')}</b><small className="font-mono text-[10.5px] text-dim">ID: {user.id}</small></div>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
      {payOpen && <PaymentModal open onClose={() => setPayOpen(false)} plan="Business" amount={150000} userId={user.id} userName={user.name} userEmail={user.email} />}
    </div>
  )
}