import './cookie-consent.css'
import { useEffect, useState } from 'react'
import { Cookie } from '@phosphor-icons/react'
import { OPEN_PREFERENCES_EVENT, readConsent, saveConsent } from '../lib/consent.js'

// Aviso de cookies: aparece en la primera visita y se reabre desde el footer.
export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(() => readConsent() === null)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [allowAnalytics, setAllowAnalytics] = useState(() => readConsent()?.analytics ?? false)

  useEffect(() => {
    const openPreferences = () => {
      setAllowAnalytics(readConsent()?.analytics ?? false)
      setIsCustomizing(true)
      setIsOpen(true)
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
  }, [])

  const decide = (analytics) => {
    saveConsent({ analytics })
    setIsOpen(false)
    setIsCustomizing(false)
  }

  if (!isOpen) return null

  return (
    <section className="cookie-consent" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-text">
      <div className="cookie-consent-head">
        <span className="cookie-consent-icon" aria-hidden="true"><Cookie size={22} weight="fill" /></span>
        <h2 id="cookie-title">¿Hablamos de cookies?</h2>
      </div>

      <p id="cookie-text">
        Usamos solo lo necesario para que la web funcione. Con tu permiso, también podríamos medir visitas
        para mejorarla. Más detalles en nuestra <a href="/cookies/">Política de cookies</a>.
      </p>

      {isCustomizing && (
        <div className="cookie-options">
          <label className="cookie-option">
            <span>
              <strong>Necesarias</strong>
              <small>Guardan tu elección y mantienen el sitio seguro. Siempre activas.</small>
            </span>
            <input type="checkbox" checked disabled />
          </label>
          <label className="cookie-option">
            <span>
              <strong>Analítica</strong>
              <small>Nos ayudaría a saber qué secciones se visitan. Hoy no la usamos: solo se activaría con tu permiso.</small>
            </span>
            <input
              type="checkbox"
              checked={allowAnalytics}
              onChange={(event) => setAllowAnalytics(event.target.checked)}
            />
          </label>
        </div>
      )}

      <div className="cookie-actions">
        {isCustomizing ? (
          <button type="button" className="cookie-button cookie-button-primary" onClick={() => decide(allowAnalytics)}>
            Guardar preferencias
          </button>
        ) : (
          <>
            <button type="button" className="cookie-button cookie-button-primary" onClick={() => decide(true)}>
              Aceptar todas
            </button>
            <button type="button" className="cookie-button" onClick={() => decide(false)}>
              Solo necesarias
            </button>
            <button type="button" className="cookie-link" onClick={() => setIsCustomizing(true)}>
              Configurar
            </button>
          </>
        )}
      </div>
    </section>
  )
}
