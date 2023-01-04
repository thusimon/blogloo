import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext, Actions } from '../context/app-context';
import { HTTPStatusErrorType, LOCALE } from '../types';
import ArticleInfo, { ArticleInfoType } from '../model/ArticleInfo';
import Article, { ArticleType } from '../model/Article';
import Head from './Head';
import ArticleContentReader from './ArticleContentReader';

import Loading from '../assets/images/loading.svg';
import Error from '../assets/images/error.svg';

const MainAppView = (): JSX.Element => {
  const { listId } = useParams();
  const { state, dispatch } = useAppContext();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<HTTPStatusErrorType | null>(null);
  const { t } = useTranslation();

  const updateArticleAndListId = (articleId: string, listId: string, listArticles: ArticleInfo[]): void => {
    dispatch({ type: Actions.UpdateArticleAndListId, data: { articleId, listId, listArticles } });
  };

  const getArticle = async (id: string): Promise<void> => {
    const articleRequest = await fetch(`/api/user/article/full-a/${encodeURIComponent(id)}`);
    const articleResp = await articleRequest.json() as ArticleType;
    const article = new Article(articleResp);
    document.title = article.title ?? 'Blogloo';
    setArticle(article);
  };

  useEffect(() => {
    const getArticlesByListId = async (listId: string = ''): Promise<void> => {
      if (listId !== '') {
        const articlesInfoRequest = await fetch(`/api/user/article/infolist-a/${encodeURIComponent(listId)}`);
        const articlesInfoResp = await articlesInfoRequest.json() as ArticleInfoType[];
        const localeKeys = Object.keys(LOCALE);
        const articlesInfo = articlesInfoResp.map(articleInfo => new ArticleInfo(articleInfo))
          .sort((a, b) => localeKeys.indexOf(a.locale) - localeKeys.indexOf(b.locale));
        if (articlesInfo.length > 0) {
          const firstInfo = articlesInfo[0];
          const localeInfo = articlesInfo.find(article => article.locale === state.locale);
          const articleInfo = localeInfo ?? firstInfo;
          updateArticleAndListId(articleInfo.id, listId, articlesInfo);
          await getArticle(articleInfo.id);
        } else {
          setError({
            status: 404,
            message: 'resp404'
          });
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

  const getView = (): JSX.Element => {
    if (error) {
      const errorTitle = t('errorOccurs');
      const errorMessage = t(error.message);
      return <div className='flex flex-col justify-center h-3/5 text-center'>
        <div className='flex justify-center items-center'>
          <img className='mx-2 h-6' src={Error}></img>
          <span className='text-rem2_4 font-semibold'>{errorTitle}</span>
        </div>
        <span className='text-2xl'>{errorMessage}</span>
      </div>;
    } else {
      return article
        ? <ArticleContentReader article={article} />
        : <div className='flex justify-center h-full'>
          <img className='w-2/5' src={Loading}></img>
        </div>;
    }
  };

  return <div className='select-none'>
    <div>
      <Head showLocale={true} />
    </div>
    <div className='overflow-y-auto h-[calc(100vh-30px)]'>
      {getView()}
    </div>
  </div>;
};

export default MainAppView;
