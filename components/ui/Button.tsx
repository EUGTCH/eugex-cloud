import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const base = 'relative overflow-hidden inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-35 disabled:cursor-not-allowed disabled:transform-none'
    const variants = {
      primary: 'bg-accent text-[#04121c] btn-shimmer hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(79,224,255,.4),0_0_22px_rgba(79,224,255,.35)]',
      ghost: 'bg-white/5 border border-line2 text-white hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(79,224,255,.12)]',
    }
    const sizes = { sm: 'px-[18px] py-[9px] text-[13.5px] rounded-[10px]', md: 'px-[26px] py-[13px] text-[15px]', lg: 'px-[34px] py-[17px] text-base rounded-[14px]' }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={isLoading || props.disabled} {...props}>
        {isLoading && <span className="mr-1.5 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button