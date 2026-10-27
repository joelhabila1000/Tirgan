import { useEffect, useRef, useState } from 'react'

/**
 * Counter — counts up to `value` when it scrolls into view.
 * Immediately shows the final figure when the visitor prefers reduced motion.
 */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1700,
  className = '',
  suffixClassName = 'stat__suffix',
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return undefined
    }

    let frame = 0
    let start = 0

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      /* easeOutExpo — fast start, gentle settle */
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true
            frame = requestAnimationFrame(step)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-NG')}
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  )
}
