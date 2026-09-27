import './conversation-lab.css'
import { useState } from 'react'
import { ArrowRight, ChatCircleDots, Check } from '@phosphor-icons/react'
import { ASSISTANT_NAME, BUSINESS_NAME, labScenarios } from './labScenarios.js'

export function ConversationLab() {
  const [activeId, setActiveId] = useState(labScenarios[0].id)
  const scenario = labScenarios.find((item) => item.id === activeId) ?? labScenarios[0]

  return (
    <section className="conversation-lab section-bordered" id="laboratorio">
      <div className="lab-heading" data-reveal>
        <p>Laboratorio conversacional</p>
        <h2>Prueba cómo cambia una respuesta.</h2>
        <span>
          Elige lo que escribiría un cliente y mira cómo responde un asistente diseñado por Helou:
          cálido, claro y siempre con un siguiente paso.
        </span>
      </div>

      <div className="lab-console" data-reveal>
        <div className="lab-options" role="group" aria-label="Elige un mensaje de cliente">
          <p className="lab-options-label">El cliente escribe…</p>
          {labScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeId ? 'is-active' : ''}
              onClick={() => setActiveId(item.id)}
              aria-pressed={item.id === activeId}
            >
              <span>{item.label}</span>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>

        <div className="conversation-preview">
          <div className="chat-header">
            <span className="chat-avatar" aria-hidden="true"><ChatCircleDots size={20} weight="fill" /></span>
            <div>
              <strong>{ASSISTANT_NAME} · {BUSINESS_NAME}</strong>
              <span className="chat-status"><span className="chat-status-dot" aria-hidden="true" /> En línea</span>
            </div>
          </div>

          {/* La key reinicia la animación de escritura en cada ejemplo. */}
          <div className="chat-thread" key={scenario.id} aria-live="polite">
            <p className="chat-bubble chat-bubble-user">{scenario.customer}</p>

            <div className="chat-bot-group">
              <span className="chat-avatar chat-avatar-small" aria-hidden="true">
                <ChatCircleDots size={16} weight="fill" />
              </span>
              <div className="chat-bot-messages">
                <span className="chat-typing" aria-hidden="true"><i /><i /><i /></span>
                {scenario.replies.map((reply, index) => (
                  <p className="chat-bubble chat-bubble-bot" style={{ '--i': index }} key={reply}>
                    {reply}
                  </p>
                ))}
                <div
                  className="chat-quick-replies"
                  style={{ '--i': scenario.replies.length }}
                  role="group"
                  aria-label="Respuestas sugeridas"
                >
                  {scenario.quickReplies.map((option) => <span key={option}>{option}</span>)}
                </div>
              </div>
            </div>
          </div>

          <p className="reply-hint" key={`hint-${scenario.id}`}>
            <Check size={17} weight="bold" /> {scenario.hint}
          </p>
        </div>
      </div>
    </section>
  )
}
