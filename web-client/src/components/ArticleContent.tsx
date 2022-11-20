import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/app-context';
import Article, { ArticleType } from '../model/Article';
import ArticleContentManager from './ArticleContentManager';
import ArticleContentReader from './ArticleContentReader';
import Welcome from './Welcome';

const ArticleContent = (): JSX.Element => {
  const { state } = useAppContext();
  const location = useLocation();

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getArticleFullByid = async (isAdmin: boolean, id: string = ''): Promise<void> => {
      if (!id) {
        setArticle(null);
      } else {
        const url = `/api/${isAdmin ? 'admin' : 'user'}/article/full/${encodeURIComponent(id)}`;
        const option = {
          method: 'GET'
        };
        isAdmin && Object.assign(option, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwt}`
          }
        });
        const articleRequest = await fetch(url, option);
        const articleResp = await articleRequest.json() as ArticleType;
        const article = new Article(articleResp);
        setArticle(article);
      }
    };
    const isAdmin = location.pathname === '/view-admin/manage' ||
      location.pathname === '/view-admin';
    void getArticleFullByid(isAdmin, state.articleId);
  }, [state.articleId]);

  return state.jwt && location.pathname === '/view-admin/manage'
    ? <ArticleContentManager article={article} />
    : (article
        ? <ArticleContentReader article={article} />
        : <Welcome />
      );
};

export default ArticleContent;
