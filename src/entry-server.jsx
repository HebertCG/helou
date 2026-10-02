import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { CookiePolicy } from './legal/CookiePolicy.jsx'
import { PrivacyPolicy } from './legal/PrivacyPolicy.jsx'
import { TermsOfService } from './legal/TermsOfService.jsx'

const pages = {
  inicio: App,
  privacidad: PrivacyPolicy,
  terminos: TermsOfService,
  cookies: CookiePolicy,
}
export function render(page = 'inicio') {
  const Page = pages[page] ?? App
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
