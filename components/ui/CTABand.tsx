'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from './Button'

export default function CTABand() {
  return (
    <section className="pb-[110px] relative z-[1]">
      <div className="max-w-[1220px] mx-auto px-7">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="border border-line2 rounded-3xl px-[50px] py-16 relative overflow-hidden flex items-center justify-between gap-10 flex-wrap
          bg-[radial-gradient(600px_300px_at_20%_0%,rgba(79,224,255,.12),transparent),radial-gradient(500px_260px_at_90%_100%,rgba(123,140,255,.12),transparent)] bg-panel">
          <div>
            <h3 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] max-w-[520px] leading-[1.3]">Готовы развернуть ваши данные на Eugex Cloud?</h3>
            <p className="text-mut mt-3 text-[15px]">Регистрация за 2 минуты · активация за 1–3 минуты · поддержка 24/7</p>
          </div>
          <div className="flex gap-3.5 flex-wrap">
            <Link href="/register"><Button size="lg">Создать аккаунт</Button></Link>
            <a href="mailto:eugtch@yandex.ru"><Button variant="ghost" size="lg">Задать вопрос</Button></a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}