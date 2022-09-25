import React, { useState } from 'react';
import { LOCALE } from '../types';
import { default as ArticleInfoModel } from '../model/ArticleInfo';
import { useAppContext, Actions } from '../context/app-context';

import usFlag from '../assets/images/us.svg';
import twFlag from '../assets/images/tw.svg';
import cnFlag from '../assets/images/cn.svg';

import './ArticleInfo.scss';

export interface ArtileInfoPropsType {
  articles: ArticleInfoModel[];
  listId: string;
}

export const localeMapping = {
  [LOCALE.en]: {
    img: usFlag,
    name: 'English'
  },
  [LOCALE.zh_TW]: {
    img: twFlag,
    name: '中文正體'
  },
  [LOCALE.zh_CN]: {
    img: cnFlag,
    name: '中文简体'
  }
};

const getArticleByLocale = (locale: LOCALE, articles: ArticleInfoModel[]): ArticleInfoModel | undefined => articles.find(article => article.locale === locale);

const ArticleInfo = ({articles, listId}: ArtileInfoPropsType) => {
  const { state, dispatch } = useAppContext();
  const [articleLocale, setArticleLocale] = useState(LOCALE.en);
  const [localeToggle, setLocaleToggle] = useState(false);

  const article = getArticleByLocale(articleLocale, articles);

  const updateLocale = (locale: LOCALE) => {
    const article = getArticleByLocale(locale, articles);
    setArticleLocale(locale);
    updateArticleAndListId(article ? article.id : '', listId, articles);
  };

  const getLocalSelections = (articles: ArticleInfoModel[]) => {
    const locales = Object.keys(LOCALE) as LOCALE[]
    const filteredLocales = locales.filter(locale => articles.findIndex(article => locale === article.locale) > -1);
    return <span className={`grid-locale grid-cell ${localeToggle ? 'grid-show' : 'grid-hide'}`}>
      {filteredLocales.map(locale => {
        const { img, name } = localeMapping[locale];
        return <img src={img} title={name} alt={name} key={locale} data-se={locale}
          className={locale === articleLocale ? 'icon selected' : 'icon'}
          onClick={evt => { evt.stopPropagation(); updateLocale(locale); }}></img>
      })}
    </span>
  }

  const updateArticleAndListId = (articleId: string, listId: string, listArticles: ArticleInfoModel[]) => {
    dispatch({type: Actions.UpdateArticleAndListId, data: {articleId, listId, listArticles}});
  }

  return <div className={`article-info-container ${listId === state.listId ? 'article-info-container-selected' : ''}`}>
    <div className='article-info-basic' onClick={() => updateLocale(articleLocale)}>
      <span className='grid-title grid-cell'>{article?.title ?? '404'}</span>
      {getLocalSelections(articles)}
      <span className='grid-author grid-cell grid-cell-small'>{article?.author ?? '404'}</span>
      <span className='grid-time grid-cell grid-cell-small'>{article?.createAt?.toLocaleDateString('en') ?? '404'}</span>
    </div>
    <div className='article-info-locale-select'>
      <img src={localeMapping[articleLocale].img}
        title={localeMapping[articleLocale].name}
        alt={localeMapping[articleLocale].name}
        data-se={articleLocale}
        onClick={() => setLocaleToggle(!localeToggle)}></img>
    </div>
  </div>
}

export default ArticleInfo;
