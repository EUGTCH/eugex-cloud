import type { Metadata } from 'next'
import { Unbounded, Manrope, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import Toaster from '@/components/ui/Toaster'
import { AuthProvider } from '@/lib/auth-context'

const unbounded = Unbounded({ subsets: ['cyrillic', 'latin'], weight: ['500', '600', '700', '800'], variable: '--font-unbounded' })
const manrope = Manrope({ subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope' })
const jmono = JetBrains_Mono({ subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-jmono' })

export const metadata: Metadata = {
  title: 'Eugex Cloud — облачная платформа для разработчиков и IT-бизнеса',
  description: 'Облачная платформа обработки данных, вычислений и API-шлюзов для программистов, разработчиков и IT-бизнеса в СНГ. Оплата: МИР, СБП, безналичный счёт.',
  keywords: 'облачная платформа, API для разработчиков, обработка данных, SaaS, Eugex Cloud, ОКВЭД 62.09, IT инфраструктура',
  authors: [{ name: 'ИП Чурсин Евгений Валентинович' }],
  openGraph: {
    title: 'Eugex Cloud', description: 'Облачная платформа для разработчиков и IT-команд: данные, вычисления, API',
    url: 'https://eugex.ru', siteName: 'Eugex Cloud', locale: 'ru_RU', type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable} ${jmono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ParticlesBackground />
          <Header />
          <main className="flex-grow relative z-[1]">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}