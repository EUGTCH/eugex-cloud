'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import EqBars from './EqBars'

function PwrBars() {
  useEffect(() => {
    const t = setTimeout(() => document.querySelectorAll<HTMLElement>('[data-pwr]').forEach(b => { b.style.width = b.dataset.pwr + '%' }), 300)
    return () => clearTimeout(t)
  }, [])
  const rows = [['CPU / ядра', '96 vCPU', '82'], ['RAM / память', '512 ГБ', '64'], ['Канал / сеть', '10 Гбит/с', '91']]
  return (
    <>
      {rows.map(([l, v, w]) => (
        <div key={l} className="mt-[18px]">
          <small className="font-mono text-[10.5px] tracking-[.15em] text-dim flex justify-between uppercase">{l}<span className="text-accent">{v}</span></small>
          <div className="h-[7px] rounded bg-white/10 mt-[7px] overflow-hidden">
            <i data-pwr={w} style={{ width: 0 }} className="block h-full rounded bg-gradient-to-r from-accent to-indigo2 shadow-[0_0_10px_rgba(79,224,255,.5)] transition-all duration-[1400ms] ease-out" />
          </div>
        </div>
      ))}
    </>
  )
}

const card = 'group bg-gradient-to-b from-panel2 to-panel border border-line rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,.45)]'
const tag = 'font-mono text-[11px] tracking-[.2em] text-accent uppercase flex items-center gap-2 mb-[18px] before:content-[""] before:w-2 before:h-2 before:bg-accent before:rounded-sm before:shadow-[0_0_10px_#4FE0FF]'
const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: .5 } } as const

export default function Features() {
  return (
    <section id="features" className="py-[110px] relative z-[1]">
      <div className="max-w-[1220px] mx-auto px-7">
        <motion.div {...fade} className="mb-14">
          <div className="kicker mb-5"><i className="not-italic text-dim">01</i> Возможности</div>
          <h2 className="font-display font-bold text-[clamp(26px,2.9vw,40px)] leading-tight max-w-[760px]">Три ядра одной платформы</h2>
          <p className="text-mut text-[16.5px] max-w-[640px] mt-[18px] leading-[1.75]">Eugex Cloud — платформа для разработчиков и IT-команд: вычислительные мощности, API-шлюз и модули обработки данных. Собственное ПО, без посредников и внешних лицензий.</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-[18px]">
          <motion.div {...fade} className={`${card} col-span-12 lg:col-span-7`}>
            <div className={tag}>cloud.data-processing</div>
            <h3 className="font-display text-[21px] font-semibold mb-3">Cloud Data Processing</h3>
            <p className="text-mut text-[14.8px] leading-[1.7]">Распределённая система параллельных вычислений и обработки больших массивов данных. Автоматическое распределение нагрузки, надёжное хранение и мгновенный доступ к информационным ресурсам.</p>
            <ul className="mt-[18px] space-y-2 text-[13.8px] text-mut">
              {['Параллельная обработка петабайтных объёмов', 'Автоматический ребаланс шардов и отказоустойчивость', 'Мгновенный доступ и репликация хранения'].map(x => (
                <li key={x} className="flex gap-2.5"><span className="text-accent">▸</span>{x}</li>
              ))}
            </ul>
            <div className="mt-6 border border-line rounded-xl overflow-hidden bg-black/40">
              <EqBars bars={36} speed={1.6} className="w-full h-[110px] block" />
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ duration: .5, delay: .12 }} className={`${card} col-span-12 lg:col-span-5`}>
            <div className={tag}>api.integration-hub</div>
            <h3 className="font-display text-[21px] font-semibold mb-3">API &amp; Integration Hub</h3>
            <p className="text-mut text-[14.8px] leading-[1.7]">Шлюз для соединения внешних систем и автоматизации бизнес-процессов. Быстрое подключение модулей без сложных настроек сервера.</p>
            <div className="mt-6 space-y-2">
              {[['CRM', 'EUGEX API'], ['ERP / 1С', 'v2 gateway'], ['Webhooks', 'events']].map(([a, b]) => (
                <div key={a} className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] px-3 py-[7px] border border-line2 rounded-lg bg-[#0A101D] text-mut whitespace-nowrap">{a}</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent relative overflow-hidden">
                    <i className="absolute -top-px left-0 w-6 h-[3px] bg-accent rounded shadow-[0_0_8px_#4FE0FF] animate-[mq_2.4s_linear_infinite]" style={{ animationName: 'flow' }} />
                  </span>
                  <span className="font-mono text-[11px] px-3 py-[7px] border border-accent/50 rounded-lg bg-[#0A101D] text-accent shadow-[0_0_14px_rgba(79,224,255,.15)] whitespace-nowrap">{b}</span>
                </div>
              ))}
            </div>
            <ul className="mt-5 space-y-2 text-[13.8px] text-mut">
              <li className="flex gap-2.5"><span className="text-accent">▸</span>REST API, Webhooks и событийные очереди</li>
              <li className="flex gap-2.5"><span className="text-accent">▸</span>SDK для интеграции за один день</li>
            </ul>
          </motion.div>

          <motion.div {...fade} className={`${card} col-span-12 lg:col-span-5`}>
            <div className={tag}>custom.compute-power</div>
            <h3 className="font-display text-[21px] font-semibold mb-3">Custom Compute Power</h3>
            <p className="text-mut text-[14.8px] leading-[1.7]">Индивидуальное конфигурирование серверных часов, объёмов памяти и пропускной способности под уникальные задачи каждого клиента.</p>
            <PwrBars />
          </motion.div>

          <motion.div {...fade} transition={{ duration: .5, delay: .12 }} className={`${card} col-span-12 lg:col-span-7`}>
            <div className={tag}>billing.rubles</div>
            <h3 className="font-display text-[21px] font-semibold mb-3">Почему оплата в рублях — выгодно</h3>
            <p className="text-mut text-[14.8px] leading-[1.7]">Полностью независимая инфраструктура с прозрачным рублёвым биллингом, юридической чистотой и отсутствием рисков блокировок.</p>
            <div className="grid sm:grid-cols-2 gap-8 mt-6">
              {[
                ['Для бизнеса', ['Счета и закрывающие документы', 'Фиксация расходов без валютных рисков', 'Безналичная оплата по реквизитам', 'Прозрачная агентская отчётность 97/3']],
                ['Для физлиц', ['МИР и СБП без посредников', 'Цены без курсовых наценок', 'Электронные чеки по 54-ФЗ', 'Регламентированный возврат средств']],
              ].map(([h, list]) => (
                <div key={h as string}>
                  <h4 className="text-sm font-mono tracking-[.12em] uppercase flex items-center gap-2 mb-3.5"><span className="text-mint">◆</span>{h}</h4>
                  <ul className="space-y-2 text-[13.8px] text-mut">
                    {(list as string[]).map(x => <li key={x} className="flex gap-2.5"><span className="text-accent">▸</span>{x}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}