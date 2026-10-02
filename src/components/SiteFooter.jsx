import './site-footer.css'
import { useRef } from 'react'
import { ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react'
import { useInView } from '../hooks/useInView.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { WHATSAPP_HREF } from '../config.js'

const orbs = ['orb-sphere', 'orb-pill', 'orb-small']

export function SiteFooter({ brand, homeHref = '#inicio' }) {
  const footerRef = useRef(null)
  useScrollProgress(footerRef)
  // El flotar de las esferas sólo corre mientras el footer está a la vista.
  const isInView = useInView(footerRef)

  return (
    <footer
      className={`site-footer ${isInView ? 'is-in-view' : ''}`}
      id="conversemos"
      ref={footerRef}
    >
      <div className="footer-orbs" aria-hidden="true">
        {orbs.map((orb) => (
          <span className={`orb-track ${orb}`} key={orb}>
            <span className="orb" />
          </span>
        ))}
      </div>

      <div className="footer-inner">
        <div className="footer-cta">
          <h2 className="footer-title">
            <span>Ideas para con<em>vers</em>ar</span>
            <span>mej<em>or</em>, hoy mismo.</span>
          </h2>
          <p>Cuéntanos tu reto por WhatsApp y lo aterrizamos juntos en una conversación breve.</p>

          <a className="footer-whatsapp" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            Contactar por WhatsApp
            <span className="footer-whatsapp-icon" aria-hidden="true">
              <WhatsappLogo size={24} weight="fill" />
            </span>
          </a>
        </div>

        <div className="footer-bottom">
          <a className="brand" href={homeHref} aria-label="Helou, volver al inicio">{brand}</a>
          <p>Diseño conversacional · {new Date().getFullYear()}</p>
          <nav className="footer-legal" aria-label="Información legal">
            <a href="/privacidad/">Privacidad</a>
            <a href="/terminos/">Términos</a>
            <a href="/cookies/">Cookies</a>
          </nav>
          <a className="footer-top-link" href={homeHref}>
            Volver arriba <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
