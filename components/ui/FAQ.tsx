'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  ['Что такое Eugex Cloud?', 'Eugex Cloud — облачная платформа обработки данных, параллельных вычислений и API-шлюзов для программистов, разработчиков и IT-бизнеса в СНГ. Собственное решение: compute, data processing и Integration Hub (ОКВЭД 62.09) — независимая альтернатива зарубежным облачным экосистемам.'],
  ['Почему оплата в рублях и в чём выгода?', 'Все расчёты в рублях: нет валютных рисков и курсовых наценок. IT-команды и ИП получают счета и закрывающие документы; оплата — картой МИР или через СБП. Цены фиксированные и прозрачные.'],
  ['Какие способы оплаты доступны?', 'Три способа: карты платёжной системы «МИР» (Visa и Mastercard не принимаются), Система быстрых платежей — динамический QR-код и deep-link (комиссия 0,4–0,7%), а также безналичный расчёт по реквизитам — PDF-счёт с фиксированным назначением платежа.'],
  ['Как быстро активируется доступ после оплаты?', 'Доступ к вычислительным ресурсам предоставляется автоматически сразу после подтверждения успешной оплаты — обычно в течение 1–3 минут. Электронный Отчёт Агента формируется в Личном кабинете в момент списания средств.'],
  ['Что такое агентская модель и формула 97/3?', 'Платёж состоит из двух прозрачных частей: 97% — транзитные средства Принципала, направляемые на обеспечение серверной инфраструктуры, хостинга и каналов связи; 3% — агентское вознаграждение. Каждая оплата подтверждается автоматическим PDF-отчётом Агента с расшифровкой сумм.'],
  ['Может ли юридическое лицо оплатить по счёту?', 'Да. В модуле оплаты выберите «По реквизитам» — платформа автоматически сформирует PDF-счёт с неизменяемым назначением платежа: «Оплата ИТ-услуг по Агентской оферте (ID пользователя №…), в т.ч. Агентское вознаграждение 3%. НДС не облагается».'],
  ['Как защищены мои данные и платежи?', 'Передача данных идёт с применением SSL-шифрования через защищённый платёжный шлюз, соответствующий стандартам платёжных систем. Персональные данные обрабатываются строго по 152-ФЗ: мы запрашиваем только ФИО, e-mail, телефон и технические идентификаторы.'],
  ['Как оформить возврат средств?', 'Направьте заявление на eugtch@yandex.ru (ФИО, ID, дата и сумма платежа, причина, реквизиты). Рассмотрение — 3 рабочих дня, возврат — на ту же карту или счёт в течение 5–10 банковских дней. Возврату подлежит неиспользованная часть за вычетом фактически израсходованных ресурсов.'],
]

export default function FAQ() {
  const [open, setOpen] = useState(-1)
  return (
    <section id="faq" className="pb-[110px] relative z-[1]">
      <div className="max-w-[820px] mx-auto px-7">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="kicker justify-center mb-5"><i className="not-italic text-dim">05</i> Вопросы</div>
          <h2 className="font-display font-bold text-[clamp(26px,2.9vw,40px)]">Частые вопросы</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map(([q, a], i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }}
              className={`border rounded-2xl bg-panel/50 overflow-hidden transition-colors ${open === i ? 'border-accent/40' : 'border-line'}`}>
              <button className="w-full flex items-center gap-4 px-6 py-[21px] text-left text-[15.5px] font-bold" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="font-mono text-[11px] text-dim shrink-0">Q{i + 1}</span>{q}
                <span className={`ml-auto w-[26px] h-[26px] border border-line2 rounded-lg grid place-items-center shrink-0 transition-all ${open === i ? 'rotate-45 bg-accent/10' : ''}`}>
                  <span className="text-accent text-base leading-none">+</span>
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35 }}>
                    <p className="px-6 pb-[22px] pl-[60px] text-mut text-[14.5px] leading-[1.75]">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}