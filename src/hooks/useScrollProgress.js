import { useEffect } from 'react'
import { supportsInViewObserver } from './useInView.js'

const clamp01 = (value) => Math.min(1, Math.max(0, value))

/*
 * Expone dos variables CSS en el elemento:
 * --scroll-progress: 0 → 1 mientras cruza todo el viewport.
 * --enter-progress:  0 → 1 desde que asoma abajo hasta que se ve completo
 *                    (o llega arriba, si es más alto que la pantalla).
 *
 * Sólo escucha el scroll mientras el elemento está a la vista: fuera de ella no
 * hay nada que animar y en móvil cada medición cuesta un recálculo de layout.
 */
export function useScrollProgress(ref) {
  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight
      const crossing = (viewport - rect.top) / (viewport + rect.height)
      const entering = (viewport - rect.top) / Math.min(rect.height, viewport)
      element.style.setProperty('--scroll-progress', clamp01(crossing).toFixed(4))
      element.style.setProperty('--enter-progress', clamp01(entering).toFixed(4))
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const stop = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
    const start = () => {
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      schedule()
    }

    update()

    if (!supportsInViewObserver) {
      start()
      return stop
    }

    // Un margen generoso para que el valor ya esté bien antes de asomar.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0, rootMargin: '20% 0px 20% 0px' },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      stop()
    }
  }, [ref])
}
