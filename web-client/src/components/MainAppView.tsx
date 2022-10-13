import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext, Actions } from '../context/app-context';
import { LOCALE } from '../types';
import ArticleInfo, { ArticleInfoType } from '../model/ArticleInfo';
import Article, { ArticleType } from '../model/Article';
import Head from './Head';
import ArticleContentReader from './ArticleContentReader';

import Loading from '../assets/images/loading.svg';

import './MainAppView.scss';

const MainAppView = (): JSX.Element => {
  const { listId } = useParams();
  const { state, dispatch } = useAppContext();
  const [article, setArticle] = useState<Article | null>(null);

  const updateArticleAndListId = (articleId: string, listId: string, listArticles: ArticleInfo[]): void => {
    dispatch({ type: Actions.UpdateArticleAndListId, data: { articleId, listId, listArticles } });
  };

  const getArticle = async (id: string): Promise<void> => {
    const articleRequest = await fetch(`/api/article/full/${encodeURIComponent(id)}`);
    const articleResp = await articleRequest.json() as ArticleType;
    const article = new Article(articleResp);
    setArticle(article);
  };

  useEffect(() => {
    const getArticlesByListId = async (listId: string = ''): Promise<void> => {
      if (listId !== '') {
        const articlesInfoRequest = await fetch(`/api/article/infolist/${encodeURIComponent(listId)}`);
        const articlesInfoResp = await articlesInfoRequest.json() as ArticleInfoType[];
        const localeKeys = Object.keys(LOCALE);
        const articlesInfo = articlesInfoResp.map(articleInfo => new ArticleInfo(articleInfo))
          .sort((a, b) => localeKeys.indexOf(a.locale) - localeKeys.indexOf(b.locale));
        if (articlesInfo.length > 0) {
          const firstInfo = articlesInfo[0];
          updateArticleAndListId(firstInfo.id, listId, articlesInfo);
          await getArticle(firstInfo.id);
        }
      }
    };
    void getArticlesByListId(listId);
  }, []);

  useEffect(() => {
    setArticle(null);
    const articleInfo = state.listArticles.find(article => article.locale === state.locale);
    if (!articleInfo) {
      return;
    }
    void getArticle(articleInfo.id);
  }, [state.locale]);

  return <div className="app">
    <div className='app-header-container'>
      <Head locale={true} />
    </div>
    <div className={'app-main-view-container'}>
      { article
        ? <ArticleContentReader article={article} />
        : <div className='loading-container'>
          <img src={Loading}></img>
        </div>
      }
    </div>
  </div>;
};

export default MainAppView;
