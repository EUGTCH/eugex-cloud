'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from './Button'
import TelemetryPanel from './TelemetryPanel'

function useScramble(text: string, delay: number) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const glyphs = '!<>-_/\\[]{}=+*^?#01'
    let frame = 0, timer: number
    const total = Math.max(22, text.length + 8)
    const start = window.setTimeout(function tick() {
      frame++
      const settled = Math.floor((frame / total) * text.length)
      setOut(text.split('').map((ch, i) => (i < settled ? ch : ch === ' ' ? ' ' : glyphs[Math.floor(Math.random() * glyphs.length)])).join(''))
      if (settled < text.length) timer = window.setTimeout(tick, 30)
    }, delay)
    return () => { clearTimeout(start); clearTimeout(timer) }
  }, [text, delay])
  return out
}

export default function Hero() {
  const l1 = useScramble('Единая облачная платформа', 300)
  const l2 = useScramble('для автоматизации, обработки', 720)
  const l3 = useScramble('и агрегации данных', 1140)

  return (
    <section className="pt-[170px] pb-[90px] relative">
      <div className="max-w-[1220px] mx-auto px-7 grid lg:grid-cols-[1.08fr_.92fr] gap-14 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 flex-wrap mb-6">
            <span className="chip inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5 bg-panel/60">
              <i className="w-[7px] h-[7px] rounded-full bg-mint shadow-[0_0_10px_#3EE6A8] animate-blink" /> Все системы в норме
            </span>
            <span className="font-mono text-[11.5px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5 bg-panel/60">Для разработчиков и IT · <b className="text-accent font-semibold">ОКВЭД 62.09</b></span>
          </motion.div>

          <h1 className="font-display font-bold text-[clamp(30px,3.7vw,50px)] leading-[1.16] tracking-tight">
            <span className="block">{l1}</span>
            <span className="block">{l2}</span>
            <span className="block text-accent">{l3}</span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="mt-6 mb-9 text-mut text-[17.5px] max-w-[560px] leading-[1.75]">
            Облачная платформа обработки данных, параллельных вычислений и API-шлюзов для программистов, разработчиков и IT-бизнеса в СНГ. Независимая инфраструктура с расчётами в рублях: МИР, СБП, безналичный счёт.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }} className="flex gap-3.5 flex-wrap">
            <Link href="#pricing"><Button size="lg">Подключить тариф</Button></Link>
            <Link href="/login"><Button variant="ghost" size="lg">Войти в личный кабинет</Button></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }} className="flex gap-2.5 flex-wrap mt-7">
            <span className="font-mono text-[11.5px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5 bg-panel/60">Оплата: <b className="text-accent font-semibold">МИР</b></span>
            <span className="font-mono text-[11.5px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5 bg-panel/60"><b className="text-accent font-semibold">СБП</b> QR-код</span>
            <span className="font-mono text-[11.5px] uppercase tracking-wider text-mut border border-line rounded-full px-3.5 py-1.5 bg-panel/60">Безналичный <b className="text-accent font-semibold">счёт</b></span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>
          <TelemetryPanel />
        </motion.div>
      </div>
    </section>
  )
}