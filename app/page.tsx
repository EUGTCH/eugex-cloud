import Hero from '@/components/ui/Hero'
import Marquee from '@/components/ui/Marquee'
import Features from '@/components/ui/Features'
import About from '@/components/ui/About'
import Steps from '@/components/ui/Steps'
import Pricing from '@/components/ui/Pricing'
import FAQ from '@/components/ui/FAQ'
import CTABand from '@/components/ui/CTABand'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <About />
      <Steps />
      <Pricing />
      <FAQ />
      <CTABand />
    </>
  )
}