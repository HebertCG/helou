import { ChatCircleDots } from '@phosphor-icons/react'

export function Brand() {
  return (
    <span className="brand-content">
      <span className="brand-mark" aria-hidden="true">
        <ChatCircleDots size={25} weight="fill" />
      </span>
      <span>Helou</span>
    </span>
  )
}
