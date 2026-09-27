// Preferencias de cookies guardadas en el navegador del visitante.
const STORAGE_KEY = 'helou-cookie-consent'
const CONSENT_VERSION = 1
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

export const CONSENT_CHANGE_EVENT = 'helou:consent-change'
export const OPEN_PREFERENCES_EVENT = 'helou:open-cookie-preferences'

// Devuelve null si no hay decisión vigente (nunca decidió, cambió la versión o pasó un año).
export function readConsent() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!saved || saved.version !== CONSENT_VERSION) return null
    if (Date.now() - saved.savedAt > CONSENT_MAX_AGE_MS) return null
    return saved
  } catch {
    return null
  }
}

export function saveConsent({ analytics }) {
  const consent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(analytics),
    savedAt: Date.now(),
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Sin almacenamiento (modo privado estricto): la decisión vale solo para esta visita.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }))
  return consent
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}
