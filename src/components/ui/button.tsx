import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-brand text-primary-foreground shadow-brand hover:shadow-lg hover:-translate-y-0.5 border-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-medium hover:shadow-lg",
        outline:
          "border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 text-foreground shadow-soft hover:shadow-medium",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft hover:shadow-medium",
        ghost: "hover:bg-primary/10 hover:text-primary text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-accent text-white shadow-medium hover:shadow-lg hover:-translate-y-0.5",
        glass: "bg-glass-white backdrop-blur-md border border-white/20 text-foreground shadow-glass hover:bg-glass-white/90",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }