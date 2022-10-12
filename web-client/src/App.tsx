import { AppContextProvider } from './context/app-context';
import MainApp from './components/MainApp';
import MainAppView from './components/MainAppView';
import AdminLogin from './components/AdminLogin';
import { Routes, Route } from 'react-router-dom';

import './App.scss';

function App (): JSX.Element {
  return (
    <AppContextProvider>
      <Routes>
        <Route path='/internal/utticus-only' element={<MainApp />} />
        <Route path='/view/:listId' element={<MainAppView />} />
        <Route path='/internal/admin/manage' element={<MainApp />} />
        <Route path='/internal/admin/login' element={<AdminLogin />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
