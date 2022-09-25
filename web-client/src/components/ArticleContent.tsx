import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/app-context';
import Article, { ArticleType } from '../model/Article';
import { FAKE_ID, FAKE_LIST_ID } from '../model/ArticleInfo';
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
        // create a empty article with information
        const article = new Article({
          id: FAKE_ID,
          articleListId: state.listId ? state.listId : FAKE_LIST_ID,
          locale: state.locale,
          title: '',
          author: '',
          createAt: new Date().toISOString(),
          content: ''
        });
        setArticle(article);
      } else {
        const articleRequest = await fetch(`/api/article/full?id=${encodeURIComponent(id)}`);
        const articleResp = await articleRequest.json() as ArticleType;
        const article = new Article(articleResp);
        setArticle(article);
      }
    }
    getArticleFullByid(state.articleId);
  }, [state.articleId])

  return article ?
    (
      state.jwt && location.pathname === '/admin/manage' ?
        <ArticleContentManager article={article} />
        : <ArticleContentReader article={article} />
    )
    : <Welcome />
};

export default ArticleContent;
