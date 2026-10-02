import { useEffect, useState } from 'react'

export const supportsInViewObserver = typeof IntersectionObserver === 'function'

/*
 * Avisa cuando el elemento entra en pantalla. Se usa para:
 * - arrancar animaciones justo cuando se ven (no antes, fuera de la vista),
 * - detener los bucles infinitos mientras no se ven (menos trabajo en móvil).
 *
 * Si el navegador no soporta IntersectionObserver, devuelve true desde el
 * inicio: preferimos mostrar el contenido sin animar antes que esconderlo.
 */
export function useInView(ref, { once = false, rootMargin = '0px 0px -8% 0px' } = {}) {
  const [isInView, setIsInView] = useState(!supportsInViewObserver)

  useEffect(() => {
    const element = ref.current
    if (!element || !supportsInViewObserver) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && once) return
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold: 0, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, once, rootMargin])

  return isInView
}
