export enum LOCALE {
  en = 'en',
  zh_TW = 'zh_TW',
  zh_CN = 'zh_CN'
};

export enum COUNTRY {
  us = 'us',
  tw = 'tw',
  cn = 'cn'
};

export const LOCALE_COUNTRY_MAPPING = {
  [LOCALE.en]: COUNTRY.us,
  [LOCALE.zh_CN]: COUNTRY.cn,
  [LOCALE.zh_TW]: COUNTRY.tw
};
