import { marked } from 'marked';
import { useAppContext } from '../context/app-context';
import Article from '../model/Article';
import { getTitleFontSizeClass, getBodyFontSizeClass } from '../utils';

import '../styles/markdown-override.scss';

const ArticleContentReader = ({ article }: { article: Article }): JSX.Element => {
  const { state } = useAppContext();

  const fontSize = state.fontSize;
  const titleFontSizeClass = getTitleFontSizeClass(fontSize);
  const bodyFontSizeClass = getBodyFontSizeClass(fontSize);

  return <div className='bg-floralwhite overflow-y-auto overflow-x-hidden w-full h-full'>
    <div className={`text-center px-2 py-4 ${titleFontSizeClass}`}>
      {article.title}
    </div>
    <div className='mx-4'>
      <article id='markdown-article' className={`prose ${bodyFontSizeClass} text-black`} dangerouslySetInnerHTML={{
        __html: marked.parse(article.content)
      }}></article>
      <div className='italic text-right p-4'>
        <div className='article-author'>{article.author}</div>
        <div className='article-create-at'>{article.createAt.toLocaleDateString('en')}</div>
      </div>
    </div>
  </div>;
};

export default ArticleContentReader;
