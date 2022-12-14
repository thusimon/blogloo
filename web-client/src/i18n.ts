import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          preference: 'Preference',
          font: 'Font',
          close: 'Close'
        }
      },
      zh_TW: {
        translations: {
          preference: '設置',
          font: '字體',
          close: '關閉'
        }
      },
      zh_CN: {
        translations: {
          preference: '设置',
          font: '字体',
          close: '关闭'
        }
      }
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
