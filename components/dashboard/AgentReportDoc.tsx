import { COMPANY, PAYMENT_DESCRIPTION, fmt } from '@/lib/constants'

export type Tx = { id: string; date: string; amount: number; method: string; status: string; planName?: string; userName?: string; userEmail?: string; userId?: string }

export function AgentReportDoc({ tx }: { tx: Tx }) {
  const infra = Math.round(tx.amount * .97)
  const rew = tx.amount - infra
  return (
    <div className="bg-white text-[#14181f] font-sans p-14 max-w-[800px] mx-auto text-sm leading-[1.7]">
      <h1 className="font-display text-xl font-bold mb-1.5">ОТЧЁТ АГЕНТА № {tx.id}</h1>
      <p className="text-xs text-[#68707d] mb-8 font-mono">к Публичной Агентской Оферте · Дата: {tx.date}</p>
      <table className="w-full border-collapse mb-5">
        <tbody>
          <tr>
            <td className="border border-[#d6dae1] p-3 font-bold w-[38%] align-top">Агент</td>
            <td className="border border-[#d6dae1] p-3">{COMPANY.name}<br /><span className="font-mono text-[11px]">ИНН {COMPANY.inn} · ОГРНИП {COMPANY.ogrn}</span></td>
          </tr>
          <tr>
            <td className="border border-[#d6dae1] p-3 font-bold align-top">Принципал (Пользователь)</td>
            <td className="border border-[#d6dae1] p-3">{tx.userName || 'Пользователь'} · ID: {tx.userId || '—'}<br /><span className="font-mono text-[11px]">{tx.userEmail || '—'}</span></td>
          </tr>
        </tbody>
      </table>
      <p className="mb-5">Настоящим Агент извещает Принципала об исполнении поручения по обеспечению доступа к ресурсам облачной платформы обработки данных за период <b>{tx.date}</b>:</p>
      <div className="border-[1.5px] border-[#14181f] p-6 my-6 bg-[#fafbfc]">
        <table className="w-full border-collapse">
          <tbody>
            <tr><td className="border border-[#d6dae1] p-2.5">1. Общая сумма полученных от Принципала средств</td><td className="border border-[#d6dae1] p-2.5 text-right font-bold">{fmt(tx.amount)} руб.</td></tr>
            <tr><td className="border border-[#d6dae1] p-2.5">2. Сумма, направленная на обеспечение работы серверной инфраструктуры и провайдеров (97%)</td><td className="border border-[#d6dae1] p-2.5 text-right font-bold">{fmt(infra)} руб.</td></tr>
            <tr><td className="border border-[#d6dae1] p-2.5">3. Агентское вознаграждение (3%)</td><td className="border border-[#d6dae1] p-2.5 text-right font-bold">{fmt(rew)} руб.</td></tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[#68707d]">(НДС не облагается в связи с применением Агентом УСН)</p>
      </div>
      <p className="font-bold mb-8">Услуги оказаны в полном объёме. Поручение исполнено.</p>
      <div className="border border-dashed border-[#9aa2ad] rounded-lg p-4 text-[11.5px] text-[#68707d] mb-10">
        Документ сформирован автоматически в Личном кабинете платформы Eugex Cloud и не требует подписи и печати.<br />Способ оплаты: {tx.method} · Статус: {tx.status}
      </div>
      <div className="flex justify-between text-xs text-[#68707d]">
        <span>Eugex Cloud · {COMPANY.email} · {COMPANY.phone}</span>
        <span>Сформирован: {new Date().toLocaleDateString('ru-RU')}</span>
      </div>
    </div>
  )
}

export function InvoiceDoc({ amount, userId, userName, planName }: { amount: number; userId: string; userName: string; planName: string }) {
  const num = `СЧ-${String(Math.abs(amount * 13 + userId.length * 7919)).slice(0, 5)}`
  return (
    <div className="bg-white text-[#14181f] font-sans p-14 max-w-[800px] mx-auto text-sm leading-[1.7]">
      <h1 className="font-display text-xl font-bold mb-1.5">СЧЁТ НА ОПЛАТУ № {num}</h1>
      <p className="text-xs text-[#68707d] mb-8 font-mono">от {new Date().toLocaleDateString('ru-RU')} · Оплата ИТ-услуг по Агентской оферте</p>
      <table className="w-full border-collapse mb-5">
        <tbody>
          <tr><td className="border border-[#d6dae1] p-3 font-bold w-[30%]">Получатель</td><td className="border border-[#d6dae1] p-3"><b>{COMPANY.name}</b><br /><span className="font-mono text-[11px]">ИНН {COMPANY.inn} · ОГРНИП {COMPANY.ogrn}</span></td></tr>
          <tr><td className="border border-[#d6dae1] p-3 font-bold">Банк получателя</td><td className="border border-[#d6dae1] p-3">{COMPANY.bank}<br /><span className="font-mono text-[11px]">К/с {COMPANY.ks} · Р/с {COMPANY.rs}</span></td></tr>
          <tr><td className="border border-[#d6dae1] p-3 font-bold">Плательщик</td><td className="border border-[#d6dae1] p-3">{userName} · ID: {userId}</td></tr>
        </tbody>
      </table>
      <table className="w-full border-collapse mb-5">
        <thead><tr><th className="border border-[#d6dae1] p-3 bg-[#f2f4f7] text-left">Наименование услуги</th><th className="border border-[#d6dae1] p-3 bg-[#f2f4f7] text-right w-[22%]">Сумма</th></tr></thead>
        <tbody>
          <tr><td className="border border-[#d6dae1] p-3">Доступ к облачной платформе обработки данных Eugex Cloud (тариф «{planName}»), в т.ч. транзитные средства на инфраструктуру — 97%</td><td className="border border-[#d6dae1] p-3 text-right">{fmt(Math.round(amount * .97))} ₽</td></tr>
          <tr><td className="border border-[#d6dae1] p-3">Агентское вознаграждение — 3%</td><td className="border border-[#d6dae1] p-3 text-right">{fmt(amount - Math.round(amount * .97))} ₽</td></tr>
          <tr><td className="border border-[#d6dae1] p-3 font-bold">ИТОГО (НДС не облагается)</td><td className="border border-[#d6dae1] p-3 text-right font-bold">{fmt(amount)} ₽</td></tr>
        </tbody>
      </table>
      <div className="border-[1.5px] border-[#14181f] p-5 my-6 bg-[#fafbfc]">
        <b>Назначение платежа (неизменяемое):</b><br />«{PAYMENT_DESCRIPTION(userId)}»
      </div>
      <div className="flex justify-between text-xs text-[#68707d]">
        <span>{COMPANY.name} · {COMPANY.email}</span>
        <span>Счёт действителен 5 банковских дней</span>
      </div>
    </div>
  )
}