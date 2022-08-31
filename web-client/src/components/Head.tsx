import React, { useContext, useReducer } from 'react';
import { AppContext, initContextData } from '../context/app-context';
import { allReducer } from '../context/reducer';
import { Actions } from '../context/reducer';
const Head = () => {
  const [state, dispatch] = useReducer(allReducer, initContextData);
  console.log(8, state);

  const localeChange = (locale: string) => {
    dispatch({
      type: Actions.Change_Locale,
      data: { locale }
    });
  }
  return (
    <header className="App-header">
      <span className="logo-text">Blogloo</span>
      <span className="locales">
        <span onClick={() => localeChange('en')}>EN</span>
        <span onClick={() => localeChange('zh')}>ZH</span>
      </span>    
    </header>
  );
}
  
export default Head;
  