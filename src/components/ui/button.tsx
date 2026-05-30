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
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "rounded-lg",
          {
            "bg-rausch text-white hover:bg-rausch-active active:bg-rausch-active":
              variant === "primary",
            "bg-surface-strong text-ink hover:bg-hairline":
              variant === "secondary",
            "border border-hairline bg-canvas text-ink hover:bg-surface-soft":
              variant === "outline",
            "text-ink hover:bg-surface-soft":
              variant === "ghost",
            "bg-[#c13515] text-white hover:bg-[#b32505]":
              variant === "danger",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-12 px-6 text-base": size === "md",
            "h-14 px-8 text-base": size === "lg",
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
