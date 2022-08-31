import { createContext } from "react";

export interface ContextDataType {
  [key: string]: string;
}

export const initContextData = {
  locale: 'en'
};

export const AppContext = createContext(initContextData);
