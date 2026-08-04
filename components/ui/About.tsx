'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { fmt } from '@/lib/constants'

function Counter({ to, dec = 0 }: { to: number; dec?: number }) {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
      if (el.dataset.done) return
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting || el.dataset.done) return
        el.dataset.done = '1'
        const target = parseFloat(el.dataset.count!)
        const d = +(el.dataset.dec || 0)
        const t0 = performance.now(), dur = 1600
        const f = (t: number) => {
          const k = Math.min(1, (t - t0) / dur), v = target * (1 - Math.pow(1 - k, 3))
          el.textContent = d ? v.toFixed(d) : fmt(v)
          if (k < 1) requestAnimationFrame(f)
        }
        requestAnimationFrame(f)
        io.disconnect()
      }, { threshold: .4 })
      io.observe(el)
    })
  }, [])
  return <span data-count={to} data-dec={dec}>0</span>
}

const items = [
  ['Собственное программное решение', 'Платформа для IT-команд и разработчиков под ОКВЭД 62.09 — compute, data processing и API-шлюз без сторонних лицензий.'],
  ['Юридическая чистота', 'Публичная агентская оферта, электронный Отчёт Агента при каждом платеже, соответствие 152-ФЗ.'],
  ['Платежи без лишних посредников', 'МИР, СБП и безналичный счёт — прозрачные расчёты в рублях без валютных наценок.'],
  ['Прозрачная формула 97 / 3', '97% платежа направляется на инфраструктуру, 3% — агентское вознаграждение. Всё фиксируется в PDF-отчёте.'],
]

export default function About() {
  return (
    <section id="about" className="pb-[110px] relative z-[1]">
      <div className="max-w-[1220px] mx-auto px-7">
        <div className="grid lg:grid-cols-2 gap-[60px] items-center">
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="kicker mb-5"><i className="not-italic text-dim">02</i> О платформе</div>
            <h2 className="font-display font-bold text-[clamp(26px,2.9vw,40px)] leading-tight">Инфраструктура без внешних рисков</h2>
            <p className="text-mut text-[16.5px] mt-[18px] leading-[1.75]">Высокопроизводительная облачная платформа обработки данных, параллельных вычислений и API-шлюзов — специально для программистов, разработчиков и IT-бизнеса в СНГ. Независимая альтернатива зарубежным облакам (AWS, GCP, Azure, Vercel) с удобными расчётами в рублях.</p>
            <div className="mt-8 flex gap-3 flex-wrap">
              {['Для разработчиков', 'API и compute', 'Только МИР · СБП · Счёт'].map(c => (
                <span key={c} className="font-mono text-[11.5px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5 bg-panel/60">{c}</span>
              ))}
            </div>
          </motion.div>
          <div className="space-y-3.5">
            {items.map(([t, d], i) => (
              <motion.div key={t} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
                className="flex gap-4 border border-line rounded-2xl px-5 py-[18px] bg-panel/55 hover:border-accent/35 hover:translate-x-1.5 transition-all">
                <span className="font-mono text-xs text-accent pt-1">/0{i + 1}</span>
                <div><b className="block text-[15.5px] mb-0.5">{t}</b><p className="text-[13.5px] text-mut">{d}</p></div>
              </motion.div>
            ))}
          </div>
        </div>

        <Counter to={0} />
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden mt-[70px]">
          {[
            [<span key="a"><span data-count="12537">0</span><span className="text-accent">+</span></span>, 'вычислительных узлов в кластере'],
            [<span key="b"><span data-count="99.98" data-dec="2">0</span><span className="text-accent">%</span></span>, 'SLA доступности за последние 90 дней'],
            [<span key="c">1–3<span className="text-accent"> мин</span></span>, 'активация доступа после оплаты'],
            [<span key="d"><span data-count="2">0</span><span className="text-accent"> ПБ</span></span>, 'обрабатывается ежемесячно на платформе'],
            [<span key="e">24<span className="text-accent">/7</span></span>, 'техническая поддержка на русском языке'],
            [<span key="f"><span data-count="3">0</span><span className="text-accent">%</span></span>, 'фиксированное агентское вознаграждение'],
          ].map(([b, s], i) => (
            <div key={i} className="bg-[#0A101D] px-[30px] py-[34px]">
              <b className="font-display text-[clamp(26px,2.6vw,38px)] font-bold leading-none block">{b}</b>
              <small className="text-mut text-[13px] block mt-2.5">{s}</small>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}