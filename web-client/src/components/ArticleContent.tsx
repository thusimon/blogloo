import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/app-context';
import Article, { ArticleType } from '../model/Article';
import ArticleContentManager from './ArticleContentManager';
import ArticleContentReader from './ArticleContentReader';
import Welcome from './Welcome';

const ArticleContent = () => {
  const { state } = useAppContext();
  const location = useLocation();

  const [ article, setArticle ] = useState<Article | null>(null);

  useEffect(() => {
    const getArticleFullByid = async (id: string) => {
      if (!id) {
        setArticle(null);
      } else {
        const articleRequest = await fetch(`/api/article/full/${encodeURIComponent(id)}`);
        const articleResp = await articleRequest.json() as ArticleType;
        const article = new Article(articleResp);
        setArticle(article);
      }
    }
    getArticleFullByid(state.articleId);
  }, [state.articleId])

  return state.jwt && location.pathname === '/admin/manage'
    ? <ArticleContentManager article={article} />
    : (article
        ? <ArticleContentReader article={article} />
        : <Welcome />
      );
};

export default ArticleContent;
