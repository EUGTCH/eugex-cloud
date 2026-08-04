'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { COMPANY } from '@/lib/constants'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/dashboard') || pathname === '/login' || pathname === '/register') return null
  return (
    <footer className="border-t border-line bg-[#080c16]/85 pt-16 relative z-[1]">
      <div className="max-w-[1220px] mx-auto px-7">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-11 pb-12">
          <div>
            <div className="font-display font-bold text-lg">EUGEX <span className="font-mono text-[10px] tracking-[.42em] text-accent font-medium">CLOUD</span></div>
            <p className="text-mut text-[13.5px] mt-4 max-w-[300px] leading-[1.7]">Облачная платформа для программистов, разработчиков и IT-бизнеса в СНГ. Compute · API · Data · ОКВЭД 62.09.</p>
            <div className="mt-[18px] flex flex-col gap-2 font-mono text-[13px]">
              <a href={`mailto:${COMPANY.email}`} className="hover:text-accent transition">{COMPANY.email}</a>
              <a href="tel:+79219085797" className="hover:text-accent transition">{COMPANY.phone}</a>
            </div>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[.24em] uppercase text-dim mb-[18px]">Платформа</h5>
            {[['/#features', 'Возможности'], ['/#about', 'О платформе'], ['/#pricing', 'Тарифы'], ['/#faq', 'FAQ'], ['/dashboard', 'Личный кабинет']].map(([h, l]) => (
              <Link key={h} href={h} className="block text-mut text-sm py-[5px] hover:text-accent hover:translate-x-1 transition-all">{l}</Link>
            ))}
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[.24em] uppercase text-dim mb-[18px]">Документы</h5>
            {[['/oferta', 'Публичная оферта'], ['/privacy', 'Политика конфиденциальности'], ['/payment-terms', 'Условия оплаты и возврата']].map(([h, l]) => (
              <Link key={h} href={h} className="block text-mut text-sm py-[5px] hover:text-accent hover:translate-x-1 transition-all">{l}</Link>
            ))}
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[.24em] uppercase text-dim mb-[18px]">Принимаем к оплате</h5>
            <div className="space-y-2.5">
              {[['МИР', 'Только карты платёжной системы МИР', 'from-[#0f8f4f] to-[#4cd07d]'],
                ['СБП', 'Оплата по QR-коду через СБП', 'from-[#7b3ff2] to-[#f2b33f]'],
                ['Р/С', 'Безналичный счёт по реквизитам', 'from-[#2b4a7a] to-[#4f7ec2]']].map(([a, b, g]) => (
                <div key={a} className="flex items-center gap-3 border border-line rounded-[10px] px-3.5 py-2.5 text-[13px] text-mut bg-panel/50">
                  <i className={`not-italic w-[34px] h-[22px] rounded grid place-items-center font-mono text-[9px] font-bold text-white shrink-0 bg-gradient-to-br ${g}`}>{a}</i>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-line py-[22px] flex justify-between gap-4 flex-wrap text-[12.5px] text-dim">
          <span>© 2026 Eugex Cloud. Все права защищены. · <b className="text-mut font-semibold">{COMPANY.name}</b></span>
          <span>ОГРНИП: {COMPANY.ogrn} · ИНН: {COMPANY.inn}</span>
        </div>
      </div>
    </footer>
  )
}