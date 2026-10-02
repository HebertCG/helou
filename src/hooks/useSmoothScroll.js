import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * En táctil (iOS/Android) el scroll nativo ya tiene inercia y va en el hilo del
 * compositor: interponer Lenis sólo añade un bucle de rAF y sensación de lag.
 */
const isTouchPrimary = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

// Smooth scroll inercial (Lenis) sólo donde aporta: puntero fino con rueda.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isTouchPrimary()) return undefined

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: easeOutExpo,
      // El alto del header ya lo aporta scroll-padding-top en CSS.
      anchors: true,
    })

    return () => lenis.destroy()
  }, [])
}
