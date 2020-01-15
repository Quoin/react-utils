import { Map } from 'immutable';

export type IActionType = string;

export interface IAction {
  type: IActionType;
  payload: object;
}

export interface ISubstate extends Map<string, any> {}

export interface IState extends Map<string, ISubstate> {}

export type HelloReducer = (state: IState, action: IAction) => IState;

export interface IReducerDefinition {
  actions: IActionType[];
  reducer: HelloReducer
}

export type INamespace = (path?: string) => string;
