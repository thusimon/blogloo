import { ContextDataType } from "./app-context";

export enum Actions {
  Change_Locale = 'Change_Locale'
};

export interface ActionType {
  type: Actions
  data: object
};

export const allReducer = (state: ContextDataType, action: ActionType) => {
  const { type, data } = action;
  switch(type) {
    case Actions.Change_Locale:
      return {...state, ...data};
    default:
      return state
  }
};
