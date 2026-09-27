import { useEffect } from 'react'

const clamp01 = (value) => Math.min(1, Math.max(0, value))

/*
 * Expone dos variables CSS en el elemento:
 * --scroll-progress: 0 → 1 mientras cruza todo el viewport.
 * --enter-progress:  0 → 1 desde que asoma abajo hasta que se ve completo
 *                    (o llega arriba, si es más alto que la pantalla).
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

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref])
}
