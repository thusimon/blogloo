import React, { createContext, useReducer } from 'react';
import logo from './logo.svg';
import { AppContext, initContextData } from './context/app-context';
import { allReducer } from './context/reducer';
import Head from './components/Head';
import './App.css';

function App() {
  return (
    <div className="App">
      <Head />
    </div>
  );
}

export default App;
