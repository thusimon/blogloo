import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext, Actions } from '../context/app-context';
import { LOCALE } from '../types';
import { localeMapping } from './ArticleInfo';

import './Head.scss';
export interface HeaderPropType {
  showLocale: boolean
};

const Head = ({ showLocale }: HeaderPropType): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    void i18n.changeLanguage(state.locale);
  }, [state.locale]);

  const updateLocale = (locale: LOCALE): void => {
    dispatch({ type: Actions.UpdateLocale, data: { locale } });
  };

  const getLocalesFromArticles = (): JSX.Element[] => {
    const locales = Object.keys(LOCALE) as LOCALE[];
    const filteredLocales = locales.filter(locale => state.listArticles.find(article => locale === article.locale));
    return filteredLocales.map(locale => {
      const { img, name } = localeMapping[locale];
      return <img src={img} title={name} alt={name} key={locale} data-se={locale}
        className={locale === state.locale ? 'icon selected' : 'icon'}
        onClick={evt => { evt.stopPropagation(); updateLocale(locale); }}></img>;
    });
  };

  return <header className='app-header'>
    <span className='logo-text'>Blogloo</span>
    <span>{t('preference')}</span>
    {
      showLocale && <div className='locale-select'>
        {
          getLocalesFromArticles()
        }
      </div>
    }
  </header>;
};

export default Head;
