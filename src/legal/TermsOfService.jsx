import { LegalPage } from './LegalPage.jsx'
import { LEGAL, SITE_URL } from '../config.js'

export function TermsOfService() {
  return (
    <LegalPage
      kicker="Legal"
      title={<>Términos y <em>condiciones</em></>}
      intro="Estas son las reglas para usar este sitio web. Al navegarlo, aceptas estos términos; si no estás de acuerdo, te pedimos no usarlo."
    >
      <section>
        <h2>1. Quiénes somos</h2>
        <p>
          El sitio <a href={SITE_URL}>{SITE_URL.replace('https://', '')}</a> es operado por{' '}
          <strong>{LEGAL.owner}</strong>, {LEGAL.ownerType}, bajo el nombre comercial <strong>Helou</strong>, con
          ubicación en {LEGAL.location}. Puedes escribirnos a{' '}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
        </p>
      </section>

      <section>
        <h2>2. Qué ofrece este sitio</h2>
        <p>
          Este sitio presenta información sobre nuestros servicios de diseño conversacional: estrategia,
          arquitectura de flujos, guiones, voz de marca y prototipado de asistentes. Su propósito es informativo y
          permitirte contactarnos.
        </p>
        <p>
          La información publicada no constituye una oferta vinculante. El alcance, los plazos y el precio de cada
          servicio se definen en una propuesta o contrato por escrito, que prevalece sobre lo indicado en el sitio.
        </p>
      </section>

      <section>
        <h2>3. Ejemplos y contenido ilustrativo</h2>
        <p>
          Las conversaciones del laboratorio y otros ejemplos (como «Spa Bienestar» o la asistente «Aurora») son
          ficticios y sirven solo para ilustrar cómo trabajamos. No representan a negocios ni personas reales.
        </p>
      </section>

      <section>
        <h2>4. Uso permitido</h2>
        <p>Al usar el sitio te comprometes a:</p>
        <ul>
          <li>Brindar información veraz cuando nos contactes.</li>
          <li>No intentar dañar, sobrecargar ni acceder sin autorización al sitio o a sus sistemas.</li>
          <li>No usar el formulario ni los canales de contacto para enviar spam o contenido ilícito.</li>
        </ul>
      </section>

      <section>
        <h2>5. Propiedad intelectual</h2>
        <p>
          La marca Helou, el logotipo, la mascota, los textos, las ilustraciones y el diseño del sitio son de
          nuestra titularidad o los usamos con autorización. No puedes copiarlos, modificarlos ni usarlos con fines
          comerciales sin nuestro permiso por escrito.
        </p>
      </section>

      <section>
        <h2>6. Enlaces y servicios de terceros</h2>
        <p>
          El sitio incluye enlaces a servicios de terceros, como WhatsApp. Al usarlos, aplican sus propios términos
          y políticas de privacidad, sobre los que no tenemos control.
        </p>
      </section>

      <section>
        <h2>7. Responsabilidad</h2>
        <p>
          Hacemos lo posible para que el sitio esté disponible y la información sea correcta, pero puede haber
          interrupciones, errores o cambios sin previo aviso. En la medida que permita la ley, no respondemos por
          daños derivados del uso del sitio o de la imposibilidad de usarlo. Nada de esto limita los derechos que
          te reconoce el Código de Protección y Defensa del Consumidor (Ley N.° 29571).
        </p>
      </section>

      <section>
        <h2>8. Datos personales y cookies</h2>
        <p>
          El tratamiento de tus datos se rige por nuestra <a href="/privacidad/">Política de privacidad</a> y el
          uso de cookies por nuestra <a href="/cookies/">Política de cookies</a>.
        </p>
      </section>

      <section>
        <h2>9. Consultas y reclamos</h2>
        <p>
          Si tienes una consulta o un reclamo sobre el sitio o nuestros servicios, escríbenos a{' '}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> y te responderemos a la brevedad.
        </p>
      </section>

      <section>
        <h2>10. Cambios y ley aplicable</h2>
        <p>
          Podemos actualizar estos términos; la versión vigente es la publicada en esta página con su fecha de
          actualización. Estos términos se rigen por las leyes de la República del Perú, y cualquier controversia
          se someterá a los jueces y tribunales competentes del Perú.
        </p>
      </section>
    </LegalPage>
  )
}
