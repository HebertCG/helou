// Número en formato internacional, sin "+" ni espacios (ej. 51987654321).
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '51900000000'
export const WHATSAPP_MESSAGE = 'Hola Helou, quiero mejorar una conversación de mi negocio.'
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const SITE_URL = 'https://helou.net.pe'

// Datos del titular que exige la Ley N.° 29733 (Protección de Datos Personales).
export const LEGAL = {
  owner: 'Hebert José Cornejo García',
  ownerType: 'persona natural',
  location: 'Veintiséis de Octubre, Piura, Perú',
  email: 'cornejogarciahebertjose@gmail.com',
  updatedAt: '27 de setiembre de 2026',
}
