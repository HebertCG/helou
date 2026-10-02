import './seo-faq.css'

const questions = [
  {
    question: '¿Qué es el diseño conversacional con IA?',
    answer:
      'Es el diseño de la lógica, los mensajes y la personalidad de un asistente o chatbot. Define qué entiende, cómo responde, cómo orienta y cuándo deriva la conversación a una persona.',
  },
  {
    question: '¿Qué recibe mi empresa al trabajar con Helou?',
    answer:
      'Un mapa de intenciones, la arquitectura de los flujos, guiones conversacionales, criterios de voz y tono, un prototipo navegable y la documentación necesaria para implementar y mejorar la experiencia.',
  },
  {
    question: '¿El servicio sirve para chatbots, WhatsApp y asistentes virtuales?',
    answer:
      'Sí. El diseño parte de las necesidades del cliente y del objetivo del negocio, y luego se adapta al canal: sitio web, WhatsApp, soporte, ventas u otros puntos de contacto conversacionales.',
  },
  {
    question: '¿Helou trabaja con empresas de todo el Perú?',
    answer:
      'Sí. El proceso puede realizarse de forma remota con equipos de Piura, Lima y otras ciudades del Perú, desde el descubrimiento hasta la entrega del prototipo y la documentación.',
  },
]

export function SeoFaq() {
  return (
    <section className="seo-faq section-bordered" aria-labelledby="faq-title">
      <div className="seo-faq-heading" data-reveal>
        <p>Preguntas frecuentes</p>
        <h2 id="faq-title">Diseño conversacional para empresas en Perú.</h2>
      </div>

      <div className="seo-faq-list" data-reveal>
        {questions.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
