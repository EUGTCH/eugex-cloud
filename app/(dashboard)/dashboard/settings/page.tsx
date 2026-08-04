'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { toast } from '@/components/ui/Toaster'
import { useAuth } from '@/lib/auth-context'

export default function SettingsPage() {
  const { user, update } = useAuth()
  const [f, setF] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [rec, setRec] = useState(false)

  return (
    <div className="grid lg:grid-cols-2 gap-[18px]">
      <div className="border border-line rounded-2xl bg-panel overflow-hidden">
        <div className="px-6 py-[18px] border-b border-line"><b className="text-[15px]">Профиль</b></div>
        <div className="p-6 space-y-4">
          {[['ФИО', 'name'], ['E-mail', 'email'], ['Телефон', 'phone']].map(([label, key]) => (
            <div key={key}>
              <label className="font-mono text-[10.5px] tracking-[.18em] uppercase text-dim block mb-2">{label}</label>
              <input className="field" value={(f as any)[key]} onChange={e => setF({ ...f, [key]: e.target.value })} />
            </div>
          ))}
          <Button size="sm" onClick={() => { update(f); toast('Профиль обновлён', 'Изменения сохранены') }}>Сохранить изменения</Button>
        </div>
      </div>
      <div className="border border-line rounded-2xl bg-panel overflow-hidden">
        <div className="px-6 py-[18px] border-b border-line"><b className="text-[15px]">Уведомления и безопасность</b></div>
        <div className="p-6 space-y-1">
          {['Письмо об успешной оплате и активации доступа', 'Отчёт Агента на e-mail при каждом платеже', 'Уведомление о приостановке доступа при исчерпании лимитов'].map((t, i) => (
            <label key={t} className="flex gap-3 items-start cursor-pointer text-[13.5px] text-mut leading-[1.6] py-2.5">
              <input type="checkbox" className="hidden peer" defaultChecked={i < 2} />
              <span className="w-5 h-5 border-[1.5px] border-line2 rounded-md grid place-items-center shrink-0 mt-px transition-all peer-checked:bg-accent peer-checked:border-accent after:content-['✓'] after:text-[#04121c] after:text-xs after:font-extrabold after:opacity-0 peer-checked:after:opacity-100" />
              <span>{t}</span>
            </label>
          ))}
          <div className="h-px bg-line my-4" />
          <label className="flex gap-3 items-start cursor-pointer text-[12.5px] text-mut leading-[1.6]">
            <input type="checkbox" className="hidden peer" checked={rec} onChange={e => setRec(e.target.checked)} />
            <span className="w-5 h-5 border-[1.5px] border-line2 rounded-md grid place-items-center shrink-0 mt-px transition-all peer-checked:bg-accent peer-checked:border-accent after:content-['✓'] after:text-[#04121c] after:text-xs after:font-extrabold after:opacity-0 peer-checked:after:opacity-100" />
            <span>Согласен на автоматическое списание средств за следующий расчётный период согласно условиям Оферты (рекуррентные платежи)</span>
          </label>
        </div>
      </div>
    </div>
  )
}