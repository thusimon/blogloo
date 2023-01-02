import { useState } from 'react';
import { getI18n } from 'react-i18next';
import { LOCALE } from '../types';
import ArticleInfoModel from '../model/ArticleInfo';
import { useAppContext, Actions } from '../context/app-context';

import usFlag from '../assets/images/us.svg';
import twFlag from '../assets/images/tw.svg';
import cnFlag from '../assets/images/cn.svg';

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

  const locales = Object.keys(LOCALE) as LOCALE[];
  const filteredLocales = locales.filter(locale => articles.find(article => locale === article.locale));

  const [localeToggle, setLocaleToggle] = useState(false);
  const [articleLocale, setArticleLocale] = useState(filteredLocales[0]);

  const article = getArticleByLocale(articleLocale, articles);

  const updateLocale = (locale: LOCALE): void => {
    const article = getArticleByLocale(locale, articles);
    document.title = article ? article.title : 'Blogloo';
    dispatch({
      type: Actions.UpdateArticleAndListId,
      data: {
        articleId: article ? article.id : '',
        listId,
        listArticles: articles
      }
    });
    dispatch({ type: Actions.UpdateLocale, data: { locale } });
    setArticleLocale(locale);
  };

  const gridCellClass = 'overflow-hidden whitespace-nowrap text-ellipsis';
  const name = i18n.getFixedT(articleLocale)('name');

  const getLocalSelections = (articles: ArticleInfoModel[]): JSX.Element => {
    const locales = Object.keys(LOCALE) as LOCALE[];
    const filteredLocales = locales.filter(locale => articles.find(article => locale === article.locale));
    return <span className={`grid-in-locale flex justify-left transition-height duration-500 ${gridCellClass} ${localeToggle ? 'h-6' : 'h-0'}`}>
      {filteredLocales.map(locale => {
        const t = i18n.getFixedT(locale);
        const name = t('name');
        const { img } = localeMapping[locale];
        return <img src={img} title={name} alt={name} key={locale} data-se={locale}
          className={`m-1 transition-transform duration-500 hover:scale-125 ${locale === articleLocale ? 'outline outline-2 outline-dodgerblue' : ''}`}
          onClick={evt => { evt.stopPropagation(); updateLocale(locale); }}></img>;
      })}
    </span>;
  };

  return <div className={`grid grid-cols-[auto_20px] p-1 [&:not(.bg-aliceblue)]:hover:bg-ghostwhite ${listId === state.listId ? 'bg-aliceblue' : ''}`}>
    <div className='cursor-pointer grid grid-cols-[60%_40%] grid-areas-article-info' onClick={() => updateLocale(articleLocale)}>
      <span className={`grid-in-title ${gridCellClass}`} title={article?.title ?? ''}>{article?.title ?? '404'}</span>
      {getLocalSelections(articles)}
      <span className={`grid-in-author ${gridCellClass} text-xs italic`} title={article?.author ?? ''}>{article?.author ?? '404'}</span>
      <span className={`grid-in-time ${gridCellClass} text-xs italic`} title={article?.createAt?.toLocaleDateString('en') ?? ''}>{article?.createAt?.toLocaleDateString('en') ?? '404'}</span>
    </div>
    <div>
      <img className='w-5 cursor-pointer hover:scale-125 transition-transform duration-500' src={localeMapping[articleLocale].img}
        title={name}
        alt={name}
        data-se={articleLocale}
        onClick={() => setLocaleToggle(!localeToggle)}></img>
    </div>
  </div>;
};

export default ArticleInfo;
