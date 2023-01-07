import { marked } from 'marked';
import { useAppContext } from '../context/app-context';
import Article from '../model/Article';
import { getTitleFontSizeClass, getBodyFontSizeClass } from '../utils';

const ArticleContentReader = ({ article }: { article: Article }): JSX.Element => {
  const { state } = useAppContext();

  const fontSize = state.fontSize;
  const titleFontSizeClass = getTitleFontSizeClass(fontSize);
  const bodyFontSizeClass = getBodyFontSizeClass(fontSize);

  return <div className='bg-floralwhite overflow-y-auto overflow-x-hidden w-full h-full'>
    <div className={`text-center p-2 ${titleFontSizeClass}`}>
      {article.title}
    </div>
    <div className={`mx-4 ${bodyFontSizeClass}`}>
      {/* <div>{
        article.content.split('\n').map((p, idx) => {
          if (p.startsWith(CLIENT_MEDIA_PREFIX)) {
            return <div className='my-2' key={`div-${idx}`}>
              {parseFileTags(p)}
            </div>;
          }
          if (p.length === 0) {
            return <br key={`div-${idx}`}/>;
          }
          return <p className='indent-4' key={`p-${idx}`}>{p}</p>;
        })
      }</div> */}
      <div dangerouslySetInnerHTML={{
        __html: marked.parse(article.content)
      }}></div>
      <div className='italic text-right p-4'>
        <div className='article-author'>{article.author}</div>
        <div className='article-create-at'>{article.createAt.toLocaleDateString('en')}</div>
      </div>
    </div>
  </div>;
};

export default ArticleContentReader;
