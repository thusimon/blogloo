import { useEffect, useState } from 'react';
import { Actions, useAppContext } from '../context/app-context';
import ArticleInfo from './ArticleInfo';
import ArticleInfoModel, { ArticleInfoType } from '../model/ArticleInfo';
import { groupBy } from '../utils';
import ListIcon from '../assets/images/list.svg';

import './SideList.scss';

const SideList = (): JSX.Element => {
  const { dispatch } = useAppContext();
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

  const toggleClickHandler = (): void => {
    dispatch({ type: Actions.ToggleSideList, data: {} });
  };

  useEffect(() => {
    const getArticles = async (): Promise<void> => {
      const articleInfoRequest = await fetch('/api/article/all');
      const articleResp = await articleInfoRequest.json() as ArticleInfoType[];
      const articleInfos = articleResp.map(article => new ArticleInfoModel(article));
      const sortedGroupedArticles = groupArticlesByListId(articleInfos);
      setArticles(sortedGroupedArticles);
    };
    void getArticles();
  }, []);

  return (
    <div className='side-list-container'>
      <div className='side-list-toggle'>
        <img src={ListIcon} title='Toggle List' alt='Toggle' onClick={toggleClickHandler}/>
      </div>
      <div className='side-list-info'>
        {articles.map((articleGroup, idx) => <ArticleInfo key={`article-info-group-${idx}`} articles={articleGroup} listId={articleGroup[0].articleListId} />)}
      </div>
    </div>
  );
};

export default SideList;
