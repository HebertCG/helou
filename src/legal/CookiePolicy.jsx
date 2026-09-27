import { LegalPage } from './LegalPage.jsx'
import { LEGAL } from '../config.js'

const cookies = [
  {
    name: '__cf_bm y similares',
    provider: 'Cloudflare',
    purpose: 'Proteger el sitio frente a tráfico automatizado o abusivo. Solo se crea cuando la seguridad lo requiere.',
    kind: 'Técnica (necesaria)',
    duration: 'Hasta 30 minutos',
  },
]

export function CookiePolicy() {
  return (
    <LegalPage
      kicker="Legal"
      title={<>Política de <em>cookies</em></>}
      intro="Usamos lo mínimo indispensable: nada de publicidad ni seguimiento. Aquí te explicamos qué se puede guardar en tu navegador y por qué."
    >
      <section>
        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos que un sitio guarda en tu navegador para recordar información o
          funcionar correctamente, por ejemplo, para mantenerlo seguro.
        </p>
      </section>

      <section>
        <h2>2. Qué cookies usamos</h2>
        <p>
          Este sitio <strong>no usa cookies de publicidad, de seguimiento ni de redes sociales</strong>, y las
          tipografías se sirven desde nuestro propio sitio, sin llamar a servicios de terceros. La única cookie que
          puede aparecer es técnica y la coloca nuestro proveedor de alojamiento para proteger el sitio:
        </p>
        <div className="legal-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Proveedor</th>
                <th>Para qué sirve</th>
                <th>Tipo</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {cookies.map((item) => (
                <tr key={item.name}>
                  <td><code>{item.name}</code></td>
                  <td>{item.provider}</td>
                  <td>{item.purpose}</td>
                  <td>{item.kind}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Al ser estrictamente necesaria para la seguridad del sitio, no requiere tu consentimiento y no se usa
          para identificarte ni para seguir tu actividad.
        </p>
      </section>

      <section>
        <h2>3. Si esto cambia</h2>
        <p>
          Si en el futuro incorporamos herramientas que usen cookies no necesarias (por ejemplo, de analítica o
          publicidad), actualizaremos esta política y te pediremos permiso antes de activarlas.
        </p>
      </section>

      <section>
        <h2>4. Cómo gestionarlas</h2>
        <p>
          Puedes ver, bloquear o borrar las cookies desde la configuración de tu navegador. Si bloqueas las cookies
          técnicas, es posible que algunas protecciones del sitio te pidan una verificación adicional.
        </p>
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
