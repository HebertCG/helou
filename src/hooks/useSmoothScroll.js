import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

// Smooth scroll inercial (Lenis): suaviza la rueda y los enlaces internos.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

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
