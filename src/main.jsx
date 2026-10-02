import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.js'
import App from './App.jsx'
import './styles.css'

const FONT_WAIT_LIMIT_MS = 1500

// Retiene la entrada del hero hasta tener la tipografía real (evita el salto de fuente).
const markFontsReady = () => document.documentElement.classList.add('fonts-ready')

// La CSS Font Loading API no está en todos los navegadores: si falta, no esperamos.
const waitForFonts = () => {
  if (!document.fonts?.load) return Promise.resolve()
  try {
    return Promise.all([
      document.fonts.load('400 1em "Instrument Serif"'),
      document.fonts.load('italic 400 1em "Instrument Serif"'),
    ])
  } catch {
    return Promise.resolve()
  }
}

Promise.race([
  waitForFonts(),
  new Promise((resolve) => window.setTimeout(resolve, FONT_WAIT_LIMIT_MS)),
]).then(markFontsReady, markFontsReady)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
