import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../fonts.js'
import '../styles.css'
import { CookiePolicy } from './CookiePolicy.jsx'
import { PrivacyPolicy } from './PrivacyPolicy.jsx'
import { TermsOfService } from './TermsOfService.jsx'

const pages = {
  privacidad: PrivacyPolicy,
  terminos: TermsOfService,
  cookies: CookiePolicy,
}

const root = document.getElementById('root')
const Page = pages[root.dataset.page] ?? PrivacyPolicy
document.documentElement.classList.add('fonts-ready')

const app = (
  <StrictMode>
    <Page />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
