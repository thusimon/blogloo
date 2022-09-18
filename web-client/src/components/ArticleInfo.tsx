import React, { useState } from 'react';
import DropDown from './DropDown';
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

const imageListClass = {width: '20px'};

const getArticleByLocale = (locale: LOCALE, articles: ArticleInfoModel[]): ArticleInfoModel | undefined => articles.find(article => article.locale === locale);

const ArticleInfo = ({articles, listId}: ArtileInfoPropsType) => {
  const { state, dispatch } = useAppContext();
  const [articleLocale, setArticleLocale] = useState<LOCALE>(LOCALE.en);

  const article = getArticleByLocale(articleLocale, articles);

  const updateLocale = (idx: number) => {
    const localeKeys = Object.keys(LOCALE);
    const localeKey = localeKeys[idx];
    const locale = LOCALE[localeKey as keyof typeof LOCALE];
    const article = getArticleByLocale(locale, articles);
    setArticleLocale(locale);
    updateArticleAndListId(article ? article.id : '', listId);
  };

  console.log(37, state);
  const updateArticleAndListId = (articleId: string, listId: string) => {
    dispatch({type: Actions.UpdateArticleAndListId, data: {articleId, listId}});
  }

  return <div className={`article-info-container ${listId === state.listId ? 'article-info-container-selected' : ''}`}>
    <div className='article-info-basic' onClick={() => updateArticleAndListId(article ? article.id : '', listId)}>
      <span className='grid-title grid-cell'>{article?.title ?? '404'}</span>
      <span className='grid-author grid-cell grid-cell-small'>{article?.author ?? '404'}</span>
      <span className='grid-time grid-cell grid-cell-small'>{article?.createAt?.toLocaleDateString('en') ?? '404'}</span>
    </div>
    <div className='article-info-locale-select'>
      <DropDown selectCallBack={updateLocale}>
        <img src={usFlag} style={imageListClass} title='English' alt='English' data-se='en'></img>
        <img src={twFlag} style={imageListClass} title='中文正体' alt='中文正体' data-se='zh_TW'></img>
        <img src={cnFlag} style={imageListClass} title='中文简体' alt='中文简体' data-se='zh_CN'></img>
      </DropDown>
    </div>
  </div>
}

export default ArticleInfo;
