import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
// import { DateTime } from "luxon";

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'eng', // Устанавливаем английский как язык по умолчанию
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  })

// new usage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// i18n.services.formatter!.add("DATE_HUGE", (value, lng, options) => {
//   return DateTime.fromJSDate(value)
//     .setLocale(lng)
//     .toLocaleString(DateTime.DATE_HUGE);
// });

export default i18n
