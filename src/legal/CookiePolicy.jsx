import { Cookie } from '@phosphor-icons/react'
import { LegalPage } from './LegalPage.jsx'
import { LEGAL } from '../config.js'
import { openCookiePreferences } from '../lib/consent.js'

const storageItems = [
  {
    name: 'helou-cookie-consent',
    type: 'Almacenamiento local (localStorage)',
    purpose: 'Recordar si aceptaste o rechazaste las cookies opcionales.',
    kind: 'Necesaria',
    duration: '12 meses',
  },
  {
    name: '__cf_bm y similares',
    type: 'Cookie de Cloudflare',
    purpose: 'Proteger el sitio frente a tráfico automatizado o abusivo. Solo se crea cuando la seguridad lo requiere.',
    kind: 'Necesaria',
    duration: 'Hasta 30 minutos',
  },
]

export function CookiePolicy() {
  return (
    <LegalPage
      kicker="Legal"
      title={<>Política de <em>cookies</em></>}
      intro="Usamos lo mínimo indispensable. Aquí te explicamos qué guardamos en tu navegador y cómo cambiar tu elección cuando quieras."
    >
      <section>
        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies y tecnologías similares (como el almacenamiento local) son pequeños archivos que un sitio
          guarda en tu navegador para recordar información entre visitas, por ejemplo, tus preferencias.
        </p>
      </section>

      <section>
        <h2>2. Qué usamos en este sitio</h2>
        <p>
          Hoy solo usamos elementos <strong>necesarios</strong>. No usamos cookies de publicidad ni de seguimiento,
          y las tipografías se sirven desde nuestro propio sitio, sin llamar a servicios de terceros.
        </p>
        <div className="legal-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Para qué sirve</th>
                <th>Categoría</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {storageItems.map((item) => (
                <tr key={item.name}>
                  <td><code>{item.name}</code></td>
                  <td>{item.type}</td>
                  <td>{item.purpose}</td>
                  <td>{item.kind}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Cookies de analítica</h2>
        <p>
          En el futuro podríamos medir visitas de forma agregada para mejorar el sitio. Si lo hacemos,
          actualizaremos esta tabla y esas herramientas solo se activarán si aceptas la categoría «Analítica»
          en el aviso de cookies. Si no la aceptas, no se cargarán.
        </p>
      </section>

      <section>
        <h2>4. Cómo cambiar tu elección</h2>
        <p>
          Puedes cambiar tu decisión cuando quieras desde el botón de abajo o desde el enlace «Preferencias de
          cookies» al final de cada página. También puedes borrar las cookies y el almacenamiento local desde la
          configuración de tu navegador; en ese caso, te volveremos a preguntar en tu próxima visita.
        </p>
        <button type="button" className="button button-small legal-inline-button" onClick={openCookiePreferences}>
          <Cookie size={18} weight="fill" /> Cambiar preferencias de cookies
        </button>
      </section>

      <section>
        <h2>5. Más información</h2>
        <p>
          Para saber cómo tratamos tus datos personales, revisa nuestra{' '}
          <a href="/privacidad/">Política de privacidad</a>. Si tienes dudas, escríbenos a{' '}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
