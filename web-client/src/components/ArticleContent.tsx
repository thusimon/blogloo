import React, {useState, useEffect} from 'react';
import { useAppContext } from '../context/app-context';
import Article, { ArticleType } from '../model/Article';
import Welcome from './Welcome';

import './ArticleContent.scss';

const ArticleContent = () => {
  const { state } = useAppContext();
  const [ article, setArticle ] = useState<Article | null>(null);

  useEffect(() => {
    const getArticleFullByid = async (id: string) => {
      if (!id) {
        return;
      }
      const articleRequest = await fetch(`/api/article/full?id=${encodeURIComponent(id)}`);
      const articleResp = await articleRequest.json() as ArticleType;
      const article = new Article(articleResp);
      setArticle(article);
    }
    if (!state.articleId) {
      return;
    }
    getArticleFullByid(state.articleId);
  }, [state.articleId])

  return article ?
    <div className='article-container'>
      <div className='article-title'>
        {article.title}
      </div>
      <div className='article-main'>
        <div className='article-content'>{
          article.content.split('\n').map((p, idx) => <p key={`p-${idx}`}>{p}</p>)
        }</div>
        <div className='article-footer'>
          <div className='article-author'>{article.author}</div>
          <div className='article-create-at'>{article.createAt.toLocaleDateString('en')}</div>
        </div>
      </div>
    </div> :
    <Welcome />
};

export default ArticleContent;
