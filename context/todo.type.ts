import { IItem } from '../schema';

export enum types {
  GET_ITEMS = 'GET_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
}

// this is used for getItems action
export interface IGetItems {
  type: types.GET_ITEMS;
  payload: IItem[];
}

// this is used for addItem action
export interface IAddItem {
  type: types.ADD_ITEM;
  payload: IItem;
}

// this is used for updateItem action
export interface IUpdateItem {
  type: types.UPDATE_ITEM;
  payload: IItem;
}

// this is used for deleteItem action
export interface IDeleteItem {
  type: types.DELETE_ITEM;
  payload: number;
}

// This is used at the input of the Reducer for Actions
export type TodoActions = IGetItems | IAddItem | IUpdateItem | IDeleteItem;
