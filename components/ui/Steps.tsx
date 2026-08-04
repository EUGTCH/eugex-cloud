'use client'
import { motion } from 'framer-motion'

const steps = [
  ['Регистрация', 'ФИО, телефон и e-mail — без паспорта и лишних документов. Подтверждение по SMS-коду.', '≈ 2 минуты'],
  ['Выбор тарифа', 'Starter, Business или индивидуальная конфигурация с произвольной суммой счёта.', 'фиксированные цены в ₽'],
  ['Оплата', 'Карта МИР, QR-код через СБП или безналичный счёт по реквизитам — на выбор.', 'SSL · защищённый шлюз'],
  ['Активация', 'Доступ к ресурсам открывается автоматически, Отчёт Агента формируется в ЛК.', '1–3 минуты'],
]

export default function Steps() {
  return (
    <section className="pb-[110px] relative z-[1]">
      <div className="max-w-[1220px] mx-auto px-7">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="kicker mb-5"><i className="not-italic text-dim">03</i> Подключение</div>
          <h2 className="font-display font-bold text-[clamp(26px,2.9vw,40px)]">Запуск за четыре шага</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[18px]" style={{ counterReset: 'st' }}>
          {steps.map(([t, d, m], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
              className="border border-line rounded-2xl p-7 bg-gradient-to-b from-panel2 to-panel hover:-translate-y-1.5 hover:border-accent/35 transition-all">
              <span className="font-display text-[34px] font-extrabold text-transparent block mb-[18px]" style={{ WebkitTextStroke: '1px rgba(79,224,255,.55)' }}>0{i + 1}</span>
              <b className="text-base block mb-2">{t}</b>
              <p className="text-[13.5px] text-mut">{d}</p>
              <div className="mt-4 font-mono text-[11px] text-accent">{m}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}