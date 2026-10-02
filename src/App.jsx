import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CursorClick,
  List,
  PencilSimpleLine,
  Quotes,
  Sparkle,
  StarFour,
  Target,
  X,
} from '@phosphor-icons/react'
import { Brand } from './components/Brand.jsx'
import { ConversationLab } from './components/ConversationLab.jsx'
import { Manifesto } from './components/Manifesto.jsx'
import { SiteFooter } from './components/SiteFooter.jsx'
import { WhatsAppButton } from './components/WhatsAppButton.jsx'
import { supportsInViewObserver } from './hooks/useInView.js'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'

// Si el hero tarda más que esto, se muestra igual: nunca se queda oculto.
const HERO_IMAGE_WAIT_LIMIT_MS = 2500

const deliverables = [
  ['Mapa de intenciones', 'Qué necesita la persona y cómo llevarla al siguiente paso.'],
  ['Guiones conversacionales', 'Respuestas claras, naturales y alineadas con tu marca.'],
  ['Prototipo navegable', 'Una conversación real para probar antes de desarrollar.'],
  ['Sistema de voz', 'Criterios para mantener el mismo tono en cada canal.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState('idle')
  const [formError, setFormError] = useState('')
  const [isHeroImageReady, setIsHeroImageReady] = useState(false)
  const heroImageRef = useRef(null)
  useSmoothScroll()

  /*
   * La entrada del hero queda pausada hasta que la imagen está lista, así que
   * nada puede dejar ese estado colgado: si llega ya resuelta desde caché el
   * evento onLoad no vuelve a dispararse, y el temporizador cubre el caso
   * contrario, una imagen que nunca termina de cargar.
   */
  useEffect(() => {
    if (heroImageRef.current?.complete) {
      setIsHeroImageReady(true)
      return undefined
    }
    const timer = window.setTimeout(() => setIsHeroImageReady(true), HERO_IMAGE_WAIT_LIMIT_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal], [data-reveal-group]')

    // Sin IntersectionObserver mostramos todo: mejor sin animar que en blanco.
    if (!supportsInViewObserver) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    /*
     * threshold 0 + margen inferior: se dispara en cuanto el bloque asoma, sin
     * depender de su alto. Con un umbral porcentual, una sección más alta que
     * la pantalla puede no alcanzarlo nunca y quedarse oculta en móviles.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') ?? '').trim()

    if (!data.get('name')?.trim() || !email || !data.get('message')?.trim()) {
      setFormError('Completa nombre, correo y el reto que quieres resolver.')
      setFormState('error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Ingresa un correo válido para que podamos responderte.')
      setFormState('error')
      return
    }

    if (!data.get('privacy')) {
      setFormError('Necesitamos tu autorización para usar tus datos y poder responderte.')
      setFormState('error')
      return
    }

    setFormError('')
    setFormState('loading')
    window.setTimeout(() => {
      setFormState('success')
      form.reset()
    }, 700)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#inicio" aria-label="Helou, inicio" onClick={closeMenu}>
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a className="button button-outline button-small" href="#laboratorio">Laboratorio</a>
            <a className="button button-small" href="#contacto">Hablemos</a>
          </nav>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={24} /> : <List size={25} />}
          </button>
        </div>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#proceso" onClick={closeMenu}>Proceso</a>
          <a href="#laboratorio" onClick={closeMenu}>Laboratorio</a>
          <a className="button" href="#contacto" onClick={closeMenu}>Hablemos</a>
        </div>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-copy hero-enter">
            <p className="hero-kicker">Diseño de experiencias conversacionales con IA.</p>
            <h1>
              <span className="hero-title-line">Diseñamos <span className="hero-title-extra">experiencias</span></span>
              <span className="hero-title-line hero-title-wide"><span className="hero-highlight">con</span>versacionales</span>
              <span className="hero-title-line hero-title-compact"><span className="hero-highlight">con</span>versaciones</span>
              <span className="hero-title-line">que sí ayudan.</span>
            </h1>
            <div className="hero-actions">
              <a className="button" href="#contacto">
                Hablemos <ArrowUpRight size={19} weight="bold" />
              </a>
              <a className="button button-outline" href="#servicios">
                Ver servicios
              </a>
            </div>
          </div>

          <figure className={`hero-visual hero-enter hero-enter-delay ${isHeroImageReady ? 'is-ready' : ''}`}>
            <img
              ref={heroImageRef}
              src="/helo-wave-hero.webp"
              alt="Mascota de Helou saludando desde una gran burbuja de conversación"
              width="984"
              height="954"
              decoding="async"
              fetchPriority="high"
              onLoad={() => setIsHeroImageReady(true)}
              onError={() => setIsHeroImageReady(true)}
            />
          </figure>
        </section>

        <section className="capability-strip" aria-label="Capacidades de Helou">
          {['Estrategia', 'Arquitectura', 'Contenido', 'Prototipado'].map((item) => (
            <span key={item}><StarFour size={15} /> {item}</span>
          ))}
        </section>

        <section className="services section-bordered" id="servicios">
          <div className="services-intro" data-reveal>
            <div>
              <h2>Diseño conversacional</h2>
              <p>
                Convertimos objetivos de negocio en conversaciones claras, útiles y coherentes con tu marca.
              </p>
              <a className="button" href="#contacto">Hablemos <ArrowRight size={18} /></a>
            </div>

            <div className="voice-proof">
              <img
                src="/helo-wave.png"
                alt="Mascota de Helou saludando desde una burbuja de conversación"
                width="1024"
                height="1024"
                loading="lazy"
              />
              <blockquote>
                <p>Tu asistente debe sonar como tu marca, no como una máquina.</p>
                <cite>Principio de diseño Helou</cite>
              </blockquote>
            </div>
          </div>

          <div className="services-grid">
            <article className="service-card service-card-main" data-reveal>
              <div className="service-icon"><Target size={30} weight="duotone" /></div>
              <div>
                <h3>Arquitectura de flujos</h3>
                <p>Ordenamos intenciones, preguntas y rutas para que cada persona llegue a una respuesta útil.</p>
              </div>
              <div className="topic-list" aria-label="Elementos de arquitectura conversacional">
                <span>Intenciones</span><span>Contexto</span><span>Rutas</span><span>Escalamiento</span>
              </div>
            </article>

            <article className="service-card service-card-pink" data-reveal>
              <div className="service-icon"><Quotes size={28} weight="duotone" /></div>
              <h3>Voz con personalidad</h3>
              <p>Definimos una voz clara, humana y reconocible en cada respuesta.</p>
            </article>

            <article className="service-card service-card-yellow" data-reveal>
              <div className="service-icon"><CursorClick size={28} weight="duotone" /></div>
              <h3>Pruebas antes de publicar</h3>
              <p>Prototipamos para detectar desvíos, silencios y oportunidades de mejora.</p>
            </article>
          </div>
        </section>

        <section className="process" id="proceso">
          <div className="process-layout">
            <div className="process-copy" data-reveal>
              <h2>
                <span>Del <em>objetivo</em></span>
                <span>a una</span>
                <span>conversación</span>
                <span>real.</span>
              </h2>
              <p className="process-lede">
                Convertimos una necesidad de negocio en una experiencia conversacional clara, útil y lista para probar.
              </p>
              <p className="process-detail">
                Definimos la intención, el tono y cada ruta antes de desarrollar. Así reducimos dudas, detectamos fricciones y construimos con evidencia.
              </p>
              <a className="button button-green" href="#conversemos">
                Hablemos <ArrowRight size={18} />
              </a>
            </div>

            <div className="process-showcase" data-reveal>
              <div className="process-note">
                <img
                  className="process-note-mascot"
                  src="/helou-process-mascot.png"
                  alt="Mascota de Helou señalando los pasos del proceso"
                  width="1230"
                  height="1230"
                  loading="lazy"
                />
                <blockquote>
                  <p>Una buena conversación entiende, orienta y sabe cuándo pedir ayuda.</p>
                  <cite>Principio de diseño Helou</cite>
                </blockquote>
              </div>

              <p className="process-list-label">Así lo construimos</p>
              <div className="process-list">
                <article>
                  <span><Target size={23} /></span>
                  <div><h3>Descubrimos</h3><p>Alineamos el negocio, las personas y el resultado que debe lograr la conversación.</p></div>
                </article>
                <article>
                  <span><PencilSimpleLine size={23} /></span>
                  <div><h3>Diseñamos</h3><p>Construimos rutas, mensajes, tono y criterios para responder con claridad.</p></div>
                </article>
                <article>
                  <span><Sparkle size={23} /></span>
                  <div><h3>Probamos</h3><p>Simulamos casos reales, corregimos fricciones y validamos cada decisión.</p></div>
                </article>
                <article>
                  <span><Check size={23} /></span>
                  <div><h3>Entregamos</h3><p>Documentamos el sistema para que tu equipo pueda implementarlo y hacerlo crecer.</p></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <ConversationLab />

        <section className="deliverables section-bordered">
          <div className="deliverables-header" data-reveal>
            <p>Lo que queda en tus manos</p>
            <h2>Diseño listo para usar, probar y mejorar.</h2>
          </div>

          <div className="deliverables-grid">
            {deliverables.map(([title, description]) => (
              <article key={title} data-reveal>
                <StarFour size={20} weight="fill" />
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <Manifesto />

        <section className="contact-section" id="contacto">
          <div className="contact-copy" data-reveal>
            <p>¿Tienes un reto conversacional?</p>
            <h2>Diseñemos una conversación que sí ayude.</h2>
            <span>Cuéntanos qué quieres resolver y dónde sucede hoy esa conversación.</span>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal>
            <div className="form-grid">
              <label>
                <span>Nombre</span>
                <input name="name" type="text" autoComplete="name" placeholder="Tu nombre" />
              </label>
              <label>
                <span>Correo</span>
                <input name="email" type="email" autoComplete="email" placeholder="nombre@empresa.com" />
              </label>
            </div>
            <label>
              <span>Empresa <small>(opcional)</small></span>
              <input name="company" type="text" autoComplete="organization" placeholder="Nombre de tu empresa" />
            </label>
            <label>
              <span>¿Qué conversación quieres mejorar?</span>
              <textarea name="message" rows="4" placeholder="Cuéntanos el reto, canal y objetivo"></textarea>
            </label>
            <label className="form-consent">
              <input name="privacy" type="checkbox" />
              <span>
                Acepto la <a href="/privacidad/" target="_blank" rel="noopener">Política de privacidad</a> y
                autorizo el uso de mis datos para responder mi consulta.
              </span>
            </label>

            {formState === 'error' && <p className="form-message form-error" role="alert">{formError}</p>}
            {formState === 'success' && (
              <p className="form-message form-success" role="status">
                <Check size={18} weight="bold" /> Todo listo. El formulario puede conectarse ahora a tu correo o CRM.
              </p>
            )}

            <button className="button button-yellow form-button" type="submit" disabled={formState === 'loading'}>
              {formState === 'loading' ? (
                <span className="loading-label">Enviando<span aria-hidden="true">...</span></span>
              ) : (
                <>Hablemos <ArrowUpRight size={18} weight="bold" /></>
              )}
            </button>
          </form>
        </section>
      </main>

      <SiteFooter brand={<Brand />} />
      <WhatsAppButton />
    </div>
  )
}

export default App
