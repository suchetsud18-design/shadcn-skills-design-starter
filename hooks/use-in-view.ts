"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function useInView(options?: IntersectionObserverInit & { once?: boolean }) {
  const { once = true, ...observerOptions } = options ?? {}
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      elementRef.current = node
      if (!node) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (once) observerRef.current?.disconnect()
          } else if (!once) {
            setIsInView(false)
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px", ...observerOptions }
      )

      observerRef.current.observe(node)
    },
    [once, observerOptions.threshold, observerOptions.rootMargin]
  )

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  return { ref, isInView }
}
