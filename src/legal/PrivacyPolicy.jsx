import { LegalPage } from './LegalPage.jsx'
import { LEGAL, SITE_URL } from '../config.js'

export function PrivacyPolicy() {
  return (
    <LegalPage
      kicker="Legal"
      title={<>Política de <em>privacidad</em></>}
      intro="Te contamos, sin letra chica, qué datos recibimos cuando nos escribes, para qué los usamos y cómo puedes pedir que los corrijamos o eliminemos."
    >
      <section>
        <h2>1. Quién es responsable de tus datos</h2>
        <div className="legal-card">
          <p><strong>{LEGAL.owner}</strong>, {LEGAL.ownerType}, bajo el nombre comercial <strong>Helou</strong>.</p>
          <p>Ubicación: {LEGAL.location}.</p>
          <p>Correo de contacto: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></p>
          <p>Sitio web: <a href={SITE_URL}>{SITE_URL.replace('https://', '')}</a></p>
        </div>
        <p>
          Tratamos tus datos conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, y su
          Reglamento aprobado por Decreto Supremo N.° 016-2024-JUS.
        </p>
      </section>

      <section>
        <h2>2. Qué datos recopilamos</h2>
        <ul>
          <li><strong>Formulario de contacto:</strong> nombre, correo electrónico, empresa (opcional) y el mensaje que nos escribas.</li>
          <li><strong>WhatsApp:</strong> si nos escribes por WhatsApp, recibimos tu número, tu nombre de perfil y los mensajes que envíes.</li>
          <li><strong>Datos técnicos:</strong> nuestro proveedor de alojamiento puede registrar tu dirección IP, tipo de navegador y la fecha de la visita, para seguridad y funcionamiento del sitio.</li>
        </ul>
        <p>No pedimos datos sensibles y te pedimos no incluirlos en tus mensajes.</p>
      </section>

      <section>
        <h2>3. Para qué los usamos</h2>
        <ul>
          <li>Responder tus consultas y preparar propuestas o cotizaciones que nos pidas.</li>
          <li>Coordinar reuniones y dar seguimiento a un servicio que hayas contratado.</li>
          <li>Mantener el sitio seguro y funcionando correctamente.</li>
        </ul>
        <p>
          No vendemos ni alquilamos tus datos, y no te enviaremos publicidad si no nos lo pides expresamente.
        </p>
      </section>

      <section>
        <h2>4. Con qué base los tratamos</h2>
        <p>
          Tratamos tus datos con tu consentimiento, que nos das al enviar el formulario marcando la casilla de
          aceptación o al escribirnos por iniciativa propia. Puedes retirarlo en cualquier momento escribiendo a{' '}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>, sin que eso afecte lo que hicimos antes de tu pedido.
        </p>
      </section>

      <section>
        <h2>5. Por cuánto tiempo los guardamos</h2>
        <p>
          Conservamos tus datos mientras dure la conversación o el servicio y hasta por dos (2) años desde el
          último contacto, salvo que nos pidas eliminarlos antes o que una ley nos obligue a guardarlos por más
          tiempo.
        </p>
      </section>

      <section>
        <h2>6. Con quién los compartimos</h2>
        <p>Solo con proveedores que necesitamos para operar, que actúan como encargados del tratamiento:</p>
        <ul>
          <li><strong>Cloudflare, Inc.</strong>: alojamiento y seguridad del sitio web.</li>
          <li><strong>Google LLC</strong>: servicio de correo electrónico (Gmail) con el que recibimos y respondemos tus mensajes.</li>
          <li><strong>WhatsApp (Meta Platforms, Inc.)</strong>: si decides escribirnos por ese canal, sujeto también a la política de privacidad de WhatsApp.</li>
        </ul>
        <p>
          Estos proveedores pueden almacenar información fuera del Perú (por ejemplo, en Estados Unidos). Al
          aceptar esta política autorizas ese flujo transfronterizo, que se realiza con proveedores que aplican
          medidas de seguridad adecuadas.
        </p>
      </section>

      <section>
        <h2>7. Tus derechos</h2>
        <p>Puedes ejercer en cualquier momento tus derechos de:</p>
        <ul>
          <li><strong>Acceso e información:</strong> saber qué datos tuyos tenemos y cómo los usamos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
          <li><strong>Cancelación:</strong> pedir que eliminemos tus datos.</li>
          <li><strong>Oposición:</strong> oponerte a un uso determinado de tus datos.</li>
        </ul>
        <p>
          Escríbenos a <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> con el asunto «Datos personales»,
          indicando tu nombre, el derecho que quieres ejercer y un medio para responderte. Atenderemos tu pedido
          dentro de los plazos que establece la normativa vigente. Si consideras que no atendimos tu solicitud,
          puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y
          Derechos Humanos.
        </p>
      </section>

      <section>
        <h2>8. Cómo los protegemos</h2>
        <p>
          El sitio funciona con conexión cifrada (HTTPS) y el acceso a tus datos está limitado a quien necesita
          usarlos para atenderte. Ningún sistema es infalible, pero aplicamos medidas razonables para evitar
          accesos no autorizados, pérdidas o alteraciones.
        </p>
      </section>

      <section>
        <h2>9. Menores de edad</h2>
        <p>
          Nuestros servicios están dirigidos a empresas y personas mayores de edad. Si eres menor de 18 años, por
          favor no nos envíes datos personales sin la autorización de tus padres o tutores.
        </p>
      </section>

      <section>
        <h2>10. Cookies</h2>
        <p>
          No usamos cookies de publicidad ni de seguimiento. Para más detalle, revisa nuestra{' '}
          <a href="/cookies/">Política de cookies</a>.
        </p>
      </section>

      <section>
        <h2>11. Cambios a esta política</h2>
        <p>
          Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de
          actualización. Si el cambio es importante, te lo haremos saber por un medio visible.
        </p>
      </section>
    </LegalPage>
  )
}
