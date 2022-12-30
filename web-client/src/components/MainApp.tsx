import { useAppContext } from '../context/app-context';
import Head from './Head';
import SideList from './SideList';
import ArticleContent from './ArticleContent';

// import './MainApp.scss';

const MainApp = (): JSX.Element => {
  const { state } = useAppContext();
  const listClass = state.sideExpand ? '' : 'hide-sidelist';
  return <div className='select-none'>
    <div className='app-header-container'>
      <Head showLocale={false} />
    </div>
    <div className={`flex h-[calc(100vh-30px)] overflow-hidden ${listClass}`}>
      <SideList />
      <ArticleContent />
    </div>
  </div>;
};

export default MainApp;
