import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LOCALE } from '../types';
import ArticleInfo, { ArticleInfoType } from '../model/ArticleInfo';
import Article, { ArticleType } from '../model/Article';
import Head from './Head';
import ArticleContentReader from './ArticleContentReader';

import './MainAppView.scss';

const MainAppView = (): JSX.Element => {
  const { id } = useParams();
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [locales, setLocales] = useState<string[]>([]);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getArticlesByListId = async (listId: string = ''): Promise<void> => {
      if (id === '') {
        setArticles([]);
      } else {
        const articlesInfoRequest = await fetch(`/api/article/infolist/${encodeURIComponent(listId)}`);
        const articlesInfoResp = await articlesInfoRequest.json() as ArticleInfoType[];
        const articlesInfo = articlesInfoResp.map(articleInfo => new ArticleInfo(articleInfo));
        let locales = Object.keys(LOCALE);
        locales = locales.filter(locale => !!articlesInfo.find(info => info.locale === locale));
        setLocales(locales);
        setArticles(articlesInfo);
        if (articlesInfo.length > 0) {
          const firstInfo = articlesInfo[0];
          const articleRequest = await fetch(`/api/article/full/${encodeURIComponent(firstInfo.id)}`);
          const articleResp = await articleRequest.json() as ArticleType;
          const article = new Article(articleResp);
          setArticle(article);
        }
        console.log(articles);
      }
    };
    void getArticlesByListId(id);
  }, []);

  return <div className="app">
    <div className='app-header-container'>
      <Head />
    </div>
    <div className='app-main-view-container'>
      <div className='locale-select'>
        {
          locales.map(locale => <div key={locale}>{locale}</div>)
        }
      </div>
      { article ? <ArticleContentReader article={article} /> : <div>Loading</div> }
    </div>
  </div>;
};

export default MainAppView;
