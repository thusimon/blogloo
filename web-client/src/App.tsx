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
        <Route path='/' element={<MainApp />} />
        <Route path='/index.html' element={<MainApp />} />
        <Route path='/view-admin' element={<MainApp />} />
        <Route path='/view-admin/manage' element={<MainApp />} />
        <Route path='/view/:listId' element={<MainAppView />} />
        <Route path='/view-admin/login' element={<AdminLogin />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
