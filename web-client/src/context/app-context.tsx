import { createContext, useContext, useReducer, ReactNode, ReactElement } from 'react';
import ArticleInfo from '../model/ArticleInfo';
import { useQuery } from '../utils';
import { LOCALE } from '../types';

export interface ContextDataType {
  locale: LOCALE
  articleId: string
  listId: string
  listArticles: ArticleInfo[]
  jwt: string
  sideExpand: boolean
  prefModal: boolean
  fontSize: string
}

export enum Actions {
  UpdateLocale,
  UpdateArticleAndListId,
  UpdateJWT,
  TogglePrefModal,
  UpdateFontSize
};

export interface ActionType {
  type: Actions
  data: any
};

export interface ContextType {
  state: ContextDataType
  dispatch: (message: ActionType) => void
}

const initContextData: ContextDataType = {
  locale: LOCALE.en,
  articleId: '',
  listId: '',
  listArticles: [],
  jwt: localStorage.getItem('jwt') ?? '',
  sideExpand: true,
  prefModal: false,
  fontSize: 'normal'
};

const AppReducer = (state: ContextDataType, action: ActionType): ContextDataType => {
  const { type, data } = action;
  switch (type) {
    case Actions.UpdateLocale: {
      // check if list of articles exists
      const locale = data.locale as LOCALE;
      const articleByLocale = state.listArticles.find(article => article.locale === locale);
      const articleId = articleByLocale ? articleByLocale.id : '';
      return { ...state, ...{ locale, articleId } };
    }
    case Actions.UpdateArticleAndListId: {
      return { ...state, ...data };
    }
    case Actions.UpdateJWT: {
      return { ...state, ...data };
    }
    case Actions.TogglePrefModal: {
      return { ...state, ...{ prefModal: !state.prefModal } };
    }
    case Actions.UpdateFontSize: {
      return { ...state, ...data };
    }
    default:
      return state;
  }
};

const AppContext = createContext<ContextType>({} as any);

interface ProviderPropType {
  children: ReactNode
};

const buildContextData = (contextData: ContextDataType): ContextDataType => {
  const query = useQuery();
  const locale = query.get('loc');
  const fontSize = query.get('fs');
  if (locale != null) {
    contextData.locale = locale as LOCALE;
  }
  if (fontSize != null) {
    contextData.fontSize = fontSize;
  }
  return contextData;
};

export const AppContextProvider = ({ children }: ProviderPropType): ReactElement => {
  const [state, dispatch] = useReducer(AppReducer, buildContextData(initContextData));
  // NOTE: you *might* need to memoize this value
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): ContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
