import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { LOCALE } from "../types";

export interface ContextDataType {
  locale: LOCALE;
  articleId: string;
  listId: string;
}

export enum Actions {
  UpdateLocale,
  UpdateArticleListId
};

export interface ActionType {
  type: Actions
  data: object
};

export interface ContextType {
  state: ContextDataType;
  dispatch: (type: ActionType, data: Object) => void;
}

const initContextData: ContextDataType = {
  locale: LOCALE.en,
  articleId: '',
  listId: ''
};

const AppReducer = (state: ContextDataType, action: ActionType) => {
  const { type, data } = action;
  switch(type) {
    case Actions.UpdateLocale:
      return {...state, ...data};
    case Actions.UpdateArticleListId:
      return {...state, ...data};
    default:
      return state
  }
};

const AppContext = createContext({} as any);

interface ProviderPropType {
  children: ReactNode;
};

export const AppContextProvider = ({children}: ProviderPropType) => {
  const [state, dispatch] = useReducer(AppReducer, initContextData)
  // NOTE: you *might* need to memoize this value
  const value = {state, dispatch}
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
};
