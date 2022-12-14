import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext, Actions } from '../context/app-context';
import { LOCALE } from '../types';
import { localeMapping } from './ArticleInfo';
import Preference from './Preference';

export interface HeaderPropType {
  showLocale: boolean
};

const Head = ({ showLocale }: HeaderPropType): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    void i18n.changeLanguage(state.locale);
    const locales = Object.keys(LOCALE) as LOCALE[];
    const filteredLocales = locales.filter(locale => state.listArticles.find(article => locale === article.locale));
    if (filteredLocales.length > 0 && !filteredLocales.includes(state.locale)) {
      // need to update the state.locale since the articles don't have this locale
      updateLocale(filteredLocales[0]);
    }
  }, [state.locale, state.listArticles]);

  const updateLocale = (locale: LOCALE): void => {
    dispatch({ type: Actions.UpdateLocale, data: { locale } });
  };

  const onPreferenceClick = (): void => {
    dispatch({ type: Actions.TogglePrefModal, data: {} });
  };

  const getLocalesFromArticles = (): JSX.Element[] => {
    const locales = Object.keys(LOCALE) as LOCALE[];
    const filteredLocales = locales.filter(locale => state.listArticles.find(article => locale === article.locale));
    return filteredLocales.map(locale => {
      const t = i18n.getFixedT(locale);
      const name = t('name');
      const { img } = localeMapping[locale];
      return <img src={img} title={name} alt={name} key={locale} data-se={locale}
        className={`h-3/5 mx-[4px] cursor-pointer transition-transform duration-500 hover:scale-125 ${locale === state.locale ? 'outline outline-2 outline-snow' : ''}`}
        onClick={evt => { evt.stopPropagation(); updateLocale(locale); }}></img>;
    });
  };

  return <header className='h-[30px] flex items-center justify-between bg-neutral-800 text-slate-100 pl-[8px] pr-[4px]'>
    <div>
      <span className='font-bold'>Blogloo</span>
      <span className='border-r-2 mx-[12px]'></span>
      <button className='mr-[12px] hover:text-white' onClick={onPreferenceClick}>{t('preference')}</button>
    </div>
    {
      showLocale && <div className='h-full flex items-center'>
        {getLocalesFromArticles()}
      </div>
    }
    <Preference />
  </header>;
};

export default Head;
