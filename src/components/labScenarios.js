// Ejemplos del laboratorio: lo que escribe un cliente y cómo responde un asistente bien diseñado.
export const ASSISTANT_NAME = 'Aurora'
export const BUSINESS_NAME = 'Spa Bienestar'

export const labScenarios = [
  {
    id: 'separar',
    label: 'Quiero separar una cita',
    customer: 'Hola, quisiera separar una cita para mañana a las 4:00 p. m. ¿Tienen disponible?',
    replies: [
      `¡Hola, buenas tardes! 👋 Soy ${ASSISTANT_NAME}, la asistente virtual de ${BUSINESS_NAME}. Qué gusto que nos escribas.`,
      'Estuve revisando la agenda y a las 4:00 p. m. ya tenemos una cita reservada. Pero no te preocupes: mañana tengo libre a las 3:00 p. m. y a las 5:30 p. m.',
      'Si alguno de esos horarios te acomoda, dime cuál y lo separo para ti. Y si prefieres otro día, cuéntame y lo agendamos juntos 😊',
    ],
    quickReplies: ['3:00 p. m.', '5:30 p. m.', 'Ver otro día'],
    hint: 'Ofrece alternativas en lugar de un simple «no hay».',
  },
  {
    id: 'reprogramar',
    label: 'Necesito reprogramar mi cita',
    customer: 'Buenas, tengo una cita el jueves a las 10:00 a. m., pero me salió un imprevisto. ¿Puedo cambiarla?',
    replies: [
      '¡Hola! Claro que sí, estas cosas pasan y para eso estoy 🙌',
      'Ya encontré tu cita del jueves a las 10:00 a. m. Esa misma semana tengo espacio el viernes a las 10:00 a. m. o el sábado a las 11:30 a. m.',
      '¿Cuál te queda mejor? Apenas me confirmes, muevo tu cita y te envío el recordatorio por aquí mismo.',
    ],
    quickReplies: ['Viernes 10:00 a. m.', 'Sábado 11:30 a. m.', 'Otra fecha'],
    hint: 'Resuelve sin fricción y confirma el siguiente paso.',
  },
  {
    id: 'cancelar',
    label: 'Tengo que cancelar',
    customer: 'Hola, lamentablemente tengo que cancelar mi cita del martes.',
    replies: [
      '¡Hola! Gracias por avisarnos con tiempo, de verdad lo valoramos 💜',
      'Listo, tu cita del martes a las 6:00 p. m. quedó cancelada y ese espacio ya está libre para otra persona.',
      'Cuando quieras volver, escríbeme y te busco el horario que mejor te acomode. ¡Que tengas un lindo día!',
    ],
    quickReplies: ['Reservar otra fecha', 'Gracias'],
    hint: 'Cierra con calidez y deja la puerta abierta.',
  },
  {
    id: 'horarios',
    label: '¿A qué hora atienden?',
    customer: 'Hola 👋 ¿Hasta qué hora atienden hoy?',
    replies: [
      '¡Hola, qué bueno leerte! 😊 Hoy atendemos hasta las 8:00 p. m.',
      'De lunes a sábado abrimos de 9:00 a. m. a 8:00 p. m., y los domingos de 10:00 a. m. a 2:00 p. m.',
      '¿Te gustaría que te reserve un espacio para hoy? Todavía me quedan horarios por la tarde.',
    ],
    quickReplies: ['Sí, resérvame', 'Solo consultaba'],
    hint: 'Responde directo y convierte la duda en una reserva.',
  },
]
