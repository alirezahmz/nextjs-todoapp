import { types } from './todo.type';
import * as actions from './todo.type';
import { Id, IItem } from '../schema';

export const getItems = (data: IItem[]): actions.IGetItems => {
  return {
    type: types.GET_ITEMS,
    payload: data,
  };
};

export const AddItem = (item: IItem): actions.IAddItem => {
  return {
    type: types.ADD_ITEM,
    payload: item,
  };
};

export const updateItem = (item: IItem): actions.IUpdateItem => ({
  type: types.UPDATE_ITEM,
  payload: item,
});

export const deleteItem = (id: Id): actions.IDeleteItem => ({
  type: types.DELETE_ITEM,
  payload: id,
});
