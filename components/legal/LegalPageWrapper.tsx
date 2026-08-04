import { ReactNode } from 'react'

export default function LegalPageWrapper({ title, date, children }: { title: string; date?: string; children: ReactNode }) {
  return (
    <div className="max-w-[780px] mx-auto px-7 pt-40 pb-24 relative z-[1]">
      <div className="kicker mb-5"><i className="not-italic text-dim">документ</i> Правовая информация</div>
      <h1 className="font-display font-bold text-[clamp(26px,2.9vw,40px)] leading-tight">{title}</h1>
      <div className="text-sm text-mut/80 leading-[1.85] mt-10 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-white [&_h2]:mt-11 [&_h2]:mb-4 [&_h2]:pl-4 [&_h2]:border-l-[3px] [&_h2]:border-accent [&_p]:mb-3.5 [&_p]:text-[15px] [&_p]:text-[#c0cbdc] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-[3px]">
        {children}
      </div>
    </div>
  )
}