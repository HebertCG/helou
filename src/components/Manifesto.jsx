import './manifesto.css'
import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

// Cada línea: [antes, resaltado, después]
const manifestoLines = [
  ['Conversaciones que ent', 'ien', 'den.'],
  ['Respuestas con int', 'enc', 'ión.'],
  ['Una v', 'oz', ' fiel a tu marca.'],
  ['Menos dudas, más ', 'de', 'cisiones.'],
]

export function Manifesto() {
  const sectionRef = useRef(null)
  useScrollProgress(sectionRef)

  return (
    <section className="manifesto section-bordered" ref={sectionRef} aria-labelledby="manifesto-title">
      <p className="manifesto-kicker" data-reveal>Por qué Helou es para ti</p>

      <h2 id="manifesto-title" className="manifesto-lines" data-reveal-group>
        {manifestoLines.map(([before, highlight, after], index) => (
          <span className="manifesto-line" key={before} style={{ '--line-index': index }}>
            <span className="manifesto-line-inner">
              {before}<em>{highlight}</em>{after}
            </span>
          </span>
        ))}
      </h2>

      <div className="manifesto-mascot" aria-hidden="true">
        <img
          src="/helou-manifesto-mascot.png"
          alt=""
          width="1264"
          height="1264"
          loading="lazy"
        />
      </div>
    </section>
  )
}
