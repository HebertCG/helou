import './site-footer.css'
import { useRef } from 'react'
import { ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { WHATSAPP_HREF } from '../config.js'

const orbs = ['orb-sphere', 'orb-pill', 'orb-small']

export function SiteFooter({ brand }) {
  const footerRef = useRef(null)
  useScrollProgress(footerRef)

  return (
    <footer className="site-footer" ref={footerRef}>
      <svg className="svg-defs" aria-hidden="true" focusable="false">
        <filter id="orb-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        </filter>
      </svg>

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
          <a className="brand" href="#inicio" aria-label="Helou, volver al inicio">{brand}</a>
          <p>Diseño conversacional · {new Date().getFullYear()}</p>
          <a className="footer-top-link" href="#inicio">
            Volver arriba <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
