import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          name: 'English',
          preference: 'Preference',
          font: 'Font',
          close: 'Close',
          small: 'Small',
          normal: 'Normal',
          large: 'Large',
          xlarge: 'Extra Large'
        }
      },
      zh_TW: {
        translations: {
          name: '中文正體',
          preference: '設置',
          font: '字體',
          close: '關閉',
          small: '小',
          normal: '正常',
          large: '大',
          xlarge: '特大'
        }
      },
      zh_CN: {
        translations: {
          name: '中文简体',
          preference: '设置',
          font: '字体',
          close: '关闭',
          small: '小',
          normal: '正常',
          large: '大',
          xlarge: '特大'
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
