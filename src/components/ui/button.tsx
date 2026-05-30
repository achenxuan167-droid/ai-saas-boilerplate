import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-wope-accent text-white hover:bg-wope-accent-hover shadow-[0_0_24px_rgba(113,61,255,0.3)]":
              variant === "primary",
            "bg-wope-card-soft text-wope-text-soft hover:bg-wope-border hover:text-white":
              variant === "secondary",
            "border border-wope-border text-wope-text-soft hover:bg-wope-border hover:text-white":
              variant === "outline",
            "text-wope-text-soft hover:text-white hover:bg-wope-card-soft":
              variant === "ghost",
            "bg-wope-red text-white hover:bg-red-600":
              variant === "danger",
          },
          {
            "h-8 px-4 text-xs": size === "sm",
            "h-10 px-6 text-sm": size === "md",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
