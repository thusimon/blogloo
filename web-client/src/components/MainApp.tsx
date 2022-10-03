import Head from './Head';
import SideList from './SideList';
import ArticleContent from './ArticleContent';

import './MainApp.scss';

const MainApp = (): JSX.Element => {
  return <div className="app">
    <div className='app-header-container'>
      <Head />
    </div>
    <div className='app-main-container'>
      <SideList />
      <ArticleContent />
    </div>
  </div>;
};

export default MainApp;
