import { useAppContext } from '../context/app-context';
import Article from '../model/Article';
import { getTitleFontSizeClass, getBodyFontSizeClass } from '../utils';

import './ArticleContentReader.scss';

const VIDEO_IDENTIFIER = '#UTTICUS_VIDEO#';

const ArticleContentReader = ({ article }: { article: Article }): JSX.Element => {
  const { state } = useAppContext();

  const fontSize = state.fontSize;
  const titleFontSizeClass = getTitleFontSizeClass(fontSize);
  const bodyFontSizeClass = getBodyFontSizeClass(fontSize);

  return <div className='article-container right-content-container'>
    <div className={`article-title ${titleFontSizeClass}`}>
      {article.title}
    </div>
    <div className={`article-main ${bodyFontSizeClass}`}>
      <div className='article-content'>{
        article.content.split('\n').map((p, idx) => {
          if (p.startsWith(VIDEO_IDENTIFIER)) {
            const filePath = `/static/media/${p.replace(VIDEO_IDENTIFIER, '')}`;
            return <div key={`div-${idx}`} className='video-container'>
              <video controls muted autoPlay loop>
                <source src={filePath} type="video/mp4" />
              </video>
            </div>;
          }
          return <p key={`p-${idx}`}>{p}</p>;
        })
      }</div>
      <div className='article-footer'>
        <div className='article-author'>{article.author}</div>
        <div className='article-create-at'>{article.createAt.toLocaleDateString('en')}</div>
      </div>
    </div>
  </div>;
};

export default ArticleContentReader;
