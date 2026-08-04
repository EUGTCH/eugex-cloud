const items = ['Оплата в рублях', '152-ФЗ', 'SLA 99.98%', 'Активация за 1–3 минуты', 'МИР · СБП · Счёт', 'Без рисков блокировок', 'Собственное ПО · ОКВЭД 62.09', 'Отчёты Агента — PDF']

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="border-y border-line py-4 overflow-hidden bg-[#0A101D]/50 relative z-[1]">
      <div className="flex w-max animate-mq hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-[12.5px] tracking-[.22em] text-mut px-6 whitespace-nowrap uppercase">
            <i className="text-accent not-italic mr-6">✦</i>{t}
          </span>
        ))}
      </div>
    </div>
  )
}