import { AppContextProvider } from './context/app-context';
import Head from './components/Head';
import SideList from './components/SideList';
import ArticleContent from './components/ArticleContent';

import './App.scss';

function App() {
  return (
    <AppContextProvider>
      <div className="app">
        <div className='app-header-container'>
          <Head />
        </div>
        <div className='app-main-container'>
          <SideList />
          <ArticleContent />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
