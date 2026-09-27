import './whatsapp-button.css'
import { useEffect, useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { WHATSAPP_HREF } from '../config.js'

// Aparece al pasar el hero y se oculta en el footer, que ya tiene su propio botón.
export function WhatsAppButton({ heroId = 'inicio', footerSelector = '.site-footer' }) {
  const [isPastHero, setIsPastHero] = useState(false)
  const [isFooterInView, setIsFooterInView] = useState(false)
  const isVisible = isPastHero && !isFooterInView

  useEffect(() => {
    const hero = document.getElementById(heroId)
    const footer = document.querySelector(footerSelector)

    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { rootMargin: '-35% 0px 0px 0px' },
    )
    const footerObserver = new IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      { rootMargin: '0px 0px -30% 0px' },
    )

    if (hero) heroObserver.observe(hero)
    if (footer) footerObserver.observe(footer)
    return () => {
      heroObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [heroId, footerSelector])

  return (
    <a
      className={`whatsapp-fab ${isVisible ? 'is-visible' : ''}`}
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <span className="whatsapp-fab-label" aria-hidden="true">¿Hablamos por WhatsApp?</span>
      <span className="whatsapp-fab-icon">
        <WhatsappLogo size={30} weight="fill" />
      </span>
    </a>
  )
}
