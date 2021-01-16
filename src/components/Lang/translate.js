const TRANSLATIONS = {
  GENERIC_ADD: {
    es: 'Añadir',
    en: 'Add',
    eu: 'Gehitu'
  },
  GENERIC_COMPLETED: {
    es: 'Completados',
    en: 'Completed',
    eu: 'Osatutak'
  },
  PRIORITY_0: {
    es: 'Sin prisa',
    en: 'No hurry',
    eu: 'Presarik gabe'
  },
  PRIORITY_1: {
    es: 'Esta semana',
    en: 'This week',
    eu: 'Aste honetan'
  },
  PRIORITY_2: {
    es: 'Urgentísimo',
    en: 'Most urgent',
    eu: 'Oso premiazkoa'
  },
  TEXT_PLACEHOLDER: {
    es: '¿Qué quieres hacer hoy?',
    en: 'What do you want to do today?',
    eu: 'Zer egin nahi duzu gaur?'
  },
  TEXT_PLACEHOLDER_ERROR: {
    es: '¡Ehh! Te olvidaste de escribir algo',
    en: 'Hey! You forgot to write something',
    eu: 'Ehh! Zerbait idaztea ahaztu zaizu'
  },
}

const translate = (tag, lang) => {
  return TRANSLATIONS[tag][lang];
}

export default translate;