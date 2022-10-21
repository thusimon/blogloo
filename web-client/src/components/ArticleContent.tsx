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
    const getArticleFullByid = async (id: string = ''): Promise<void> => {
      if (!id) {
        setArticle(null);
      } else {
        const articleRequest = await fetch(`/api/user/article/full/${encodeURIComponent(id)}`);
        const articleResp = await articleRequest.json() as ArticleType;
        const article = new Article(articleResp);
        setArticle(article);
      }
    };
    void getArticleFullByid(state.articleId);
  }, [state.articleId]);

  return state.jwt && location.pathname === '/internal/admin/manage'
    ? <ArticleContentManager article={article} />
    : (article
        ? <ArticleContentReader article={article} />
        : <Welcome />
      );
};

export default ArticleContent;
