import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "brand" | "dots"
}

export function Loading({ className, size = "md", variant = "default", ...props }: LoadingProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center space-x-1", className)} {...props}>
        <div className={cn(
          "animate-pulse rounded-full bg-primary",
          size === "sm" && "h-1 w-1",
          size === "md" && "h-2 w-2", 
          size === "lg" && "h-3 w-3"
        )} style={{ animationDelay: "0ms" }} />
        <div className={cn(
          "animate-pulse rounded-full bg-primary",
          size === "sm" && "h-1 w-1",
          size === "md" && "h-2 w-2",
          size === "lg" && "h-3 w-3"
        )} style={{ animationDelay: "150ms" }} />
        <div className={cn(
          "animate-pulse rounded-full bg-primary", 
          size === "sm" && "h-1 w-1",
          size === "md" && "h-2 w-2",
          size === "lg" && "h-3 w-3"
        )} style={{ animationDelay: "300ms" }} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md", 
          "h-8 w-8": size === "lg",
        },
        {
          "text-muted-foreground": variant === "default",
          "text-primary": variant === "brand",
        },
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  )
}