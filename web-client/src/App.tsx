import { AppContextProvider } from './context/app-context';
import MainApp from './components/MainApp';
import MainAppView from './components/MainAppView';
import AdminLogin from './components/AdminLogin';
import { Routes, Route, HashRouter } from 'react-router-dom';

import './App.scss';

function App (): JSX.Element {
  return (
    <AppContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/view/:id" element={<MainAppView />} />
          <Route path="/admin/manage" element={<MainApp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
