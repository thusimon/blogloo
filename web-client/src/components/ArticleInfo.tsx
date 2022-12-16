import { useState } from 'react';
import { getI18n } from 'react-i18next';
import { LOCALE } from '../types';
import ArticleInfoModel from '../model/ArticleInfo';
import { useAppContext, Actions } from '../context/app-context';

import usFlag from '../assets/images/us.svg';
import twFlag from '../assets/images/tw.svg';
import cnFlag from '../assets/images/cn.svg';

import './ArticleInfo.scss';

export interface ArtileInfoPropsType {
  articles: ArticleInfoModel[]
  listId: string
}

export const localeMapping = {
  [LOCALE.en]: {
    img: usFlag
  },
  [LOCALE.zh_TW]: {
    img: twFlag
  },
  [LOCALE.zh_CN]: {
    img: cnFlag
  }
};

const getArticleByLocale = (locale: LOCALE, articles: ArticleInfoModel[]): ArticleInfoModel | undefined => articles.find(article => article.locale === locale);

const ArticleInfo = ({ articles, listId }: ArtileInfoPropsType): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const i18n = getI18n();

  const [localeToggle, setLocaleToggle] = useState(false);

  const article = getArticleByLocale(state.locale, articles);
  const articleLocale = article ? state.locale : articles[0].locale;

  const updateLocale = (locale: LOCALE): void => {
    const article = getArticleByLocale(locale, articles);
    dispatch({
      type: Actions.UpdateArticleAndListId,
      data: {
        articleId: article ? article.id : '',
        listId,
        listArticles: articles
      }
    });
    dispatch({ type: Actions.UpdateLocale, data: { locale } });
  };

  const getLocalSelections = (articles: ArticleInfoModel[]): JSX.Element => {
    const locales = Object.keys(LOCALE) as LOCALE[];
    const filteredLocales = locales.filter(locale => articles.find(article => locale === article.locale));
    return <span className={`grid-locale grid-cell ${localeToggle ? 'grid-show' : 'grid-hide'}`}>
      {filteredLocales.map(locale => {
        const t = i18n.getFixedT(locale);
        const name = t('name');
        const { img } = localeMapping[locale];
        return <img src={img} title={name} alt={name} key={locale} data-se={locale}
          className={locale === articleLocale ? 'icon selected' : 'icon'}
          onClick={evt => { evt.stopPropagation(); updateLocale(locale); }}></img>;
      })}
    </span>;
  };

  const name = i18n.getFixedT(articleLocale)('name');
  return <div className={`article-info-container ${listId === state.listId ? 'article-info-container-selected' : ''}`}>
    <div className='article-info-basic' onClick={() => updateLocale(articleLocale)}>
      <span className='grid-title grid-cell'>{article?.title ?? '404'}</span>
      {getLocalSelections(articles)}
      <span className='grid-author grid-cell grid-cell-small'>{article?.author ?? '404'}</span>
      <span className='grid-time grid-cell grid-cell-small'>{article?.createAt?.toLocaleDateString('en') ?? '404'}</span>
    </div>
    <div className='article-info-locale-select'>
      <img src={localeMapping[articleLocale].img}
        title={name}
        alt={name}
        data-se={articleLocale}
        onClick={() => setLocaleToggle(!localeToggle)}></img>
    </div>
  </div>;
};

export default ArticleInfo;
