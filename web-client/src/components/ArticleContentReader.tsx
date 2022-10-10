import Article from '../model/Article';

import './ArticleContentReader.scss';

const ArticleContentReader = ({ article }: { article: Article }): JSX.Element => {
  return <div className='article-container right-content-container'>
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
  </div>;
};

export default ArticleContentReader;
