import i18n from 'i18next'
import PTBR from './locales/pt/pt-br.json'
import ESES from './locales/es/es-es.json'
import ENUS from './locales/en/en-us.json'
import { parseCookies } from 'nookies'

import { initReactI18next } from 'react-i18next'

const { 'anatom-web-language-value' : defaultLanguage} = parseCookies();

const resources = {
    'pt-BR' : PTBR,
    'en-US' : ENUS,
    'es-ES' : ESES
}

i18n.use(initReactI18next)
    .init({
        resources,
        lng: defaultLanguage,
        fallbackLng: "pt-BR",
        interpolation: {
            escapeValue: false
        },react: {
            useSuspense: false
        },
        
    })

 export default i18n