import { AppContextProvider } from './context/app-context';
import MainApp from './components/MainApp';
import AdminLogin from './components/AdminLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/home" element={<MainApp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
