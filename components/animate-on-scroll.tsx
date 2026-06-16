"use client"

import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

type Animation = "fade-up" | "fade-left" | "fade-right" | "fade" | "zoom"

const animationClasses: Record<Animation, string> = {
  "fade-up": "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
  "fade-left": "animate-in fade-in-0 slide-in-from-left-8 duration-500",
  "fade-right": "animate-in fade-in-0 slide-in-from-right-8 duration-500",
  fade: "animate-in fade-in-0 duration-500",
  zoom: "animate-in fade-in-0 zoom-in-95 duration-500",
}

const delayClasses: Record<number, string> = {
  0: "delay-0",
  75: "delay-75",
  100: "delay-100",
  150: "delay-150",
  200: "delay-200",
  300: "delay-300",
  500: "delay-500",
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  className,
}: {
  children: React.ReactNode
  animation?: Animation
  delay?: number
  className?: string
}) {
  const { ref, isInView } = useInView()

  const nearest = Object.keys(delayClasses)
    .map(Number)
    .reduce((prev, curr) => (Math.abs(curr - delay) < Math.abs(prev - delay) ? curr : prev), 0)

  return (
    <div
      ref={ref}
      className={cn(
        "fill-mode-forwards",
        isInView ? animationClasses[animation] : "opacity-0",
        isInView && nearest > 0 && delayClasses[nearest],
        className
      )}
    >
      {children}
    </div>
  )
}
