import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useAppContext } from '../context/app-context';
import { LOCALE } from '../types';
import ArticleInfo from './ArticleInfo';
import { default as ArticleInfoModel, ArticleInfoType } from '../model/ArticleInfo';
import { groupBy } from '../utils';

const SideList = () => {
  const {state} = useAppContext()
  const [articles, setArticles] = useState([] as ArticleInfoModel[][]);

  /**
   * group by list id and sort by the earliest created article
   * @param articles
   */
  const groupArticlesByListId = (articles: ArticleInfoModel[]): ArticleInfoModel[][] => {
    const groupedArticles = groupBy(articles, 'articleListId');
    const groupedKeys = Object.keys(groupedArticles);
    const sortedGroupedKeys = groupedKeys.sort((key1: string, key2: string) => {
      const articlesGroup1 = groupedArticles[key1] as ArticleInfoModel[];
      const articlesGroup2 = groupedArticles[key2] as ArticleInfoModel[];
      // get the earliest createdAt
      const articlesGroup1Created = articlesGroup1.map(article => article.createAt.getTime());
      const articlesGroup1Earliest = Math.min(...articlesGroup1Created);
      const articlesGroup2Created = articlesGroup2.map(article => article.createAt.getTime());
      const articlesGroup2Earliest = Math.min(...articlesGroup2Created);
      return articlesGroup1Earliest - articlesGroup2Earliest;
    });
    return sortedGroupedKeys.map(key => groupedArticles[key]);
  };

  useEffect(() => {
    const getArticles = async () => {
      const articleInfoRequest = await fetch('/api/article/all');
      const articleResp = await articleInfoRequest.json() as ArticleInfoType[];
      const articleInfos = articleResp.map(article => new ArticleInfoModel(article));
      const sortedGroupedArticles = groupArticlesByListId(articleInfos);
      setArticles(sortedGroupedArticles);
      console.log(39, sortedGroupedArticles)
    }
    getArticles();
  }, []);

  return (
    <div className='side-list-info'>
      {articles.map((articleGroup, idx) => <ArticleInfo key={`article-info-group-${idx}`} articles={articleGroup} listId={articleGroup[0].articleListId} />)}
    </div>
  );
}
  
export default SideList;
