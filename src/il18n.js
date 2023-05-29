import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslation from './translations/en.json'
import heTranslation from './translations/he.json'

const resources = {
  en: {
    translation: enTranslation,
  },
  he: {
    translation: heTranslation,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
