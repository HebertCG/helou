import './legal.css'
import { ArrowLeft } from '@phosphor-icons/react'
import { Brand } from '../components/Brand.jsx'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { LEGAL } from '../config.js'

// Plantilla común de las páginas legales.
export function LegalPage({ kicker, title, intro, children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="/" aria-label="Helou, ir al inicio"><Brand /></a>
          <a className="button button-outline button-small" href="/">
            <ArrowLeft size={16} weight="bold" /> Volver al inicio
          </a>
        </div>
      </header>

      <main id="contenido" className="legal">
        <header className="legal-header">
          <p className="legal-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-updated">Última actualización: {LEGAL.updatedAt}</p>
        </header>

        <article className="legal-body">{children}</article>
      </main>

      <SiteFooter brand={<Brand />} homeHref="/" />
    </div>
  )
}
