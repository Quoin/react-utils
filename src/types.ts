import { Map } from 'immutable';
import { Reducer } from 'redux';

export type IActionType = string;

export interface IAction {
  type: IActionType;
  payload?: object;
}

export interface ISubstate extends Map<string, any> {}

export type IState = Map<string, ISubstate>;

export type IReducer = Reducer<IState, IAction>;

export type IGetComponentProps = (props?: object) => object;

export interface IReducerDefinition {
  actions: IActionType[];
  reducer: IReducer
}

export type INamespace = (path?: string) => string;

export class BaseError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = `BaseError`;
  }
}
