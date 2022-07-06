import React, { Dispatch } from 'react';
import { IItem } from '../schema';
import { TodoActions, types } from './todo.type';

interface IInitialState {
  items: IItem[];
}
const initialState: IInitialState = {
  items: [],
};
const TodoState = React.createContext<IInitialState>(initialState);
const TodoDispatch = React.createContext<TodoActions | any>(undefined);

const todoReducer = (
  state: IInitialState = initialState,
  action: TodoActions,
) => {
  switch (action.type) {
    case types.GET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };
    case types.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case types.UPDATE_ITEM: {
      const updatedItem = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
      return {
        ...state,
        items: updatedItem,
      };
    }
    case types.DELETE_ITEM: {
      const deletedItem = state.items.filter(
        (item) => item.id !== action.payload,
      );
      return {
        ...state,
        items: deletedItem,
      };
    }
    default:
      throw new Error('Unhandled action type');
  }
};

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);

  return (
    <TodoState.Provider value={state}>
      <TodoDispatch.Provider value={dispatch}>{children}</TodoDispatch.Provider>
    </TodoState.Provider>
  );
};

const useTodoState = () => {
  const Context = React.useContext(TodoState);

  if (Context === undefined) {
    throw new Error('useTodoState must be within Provider');
  }

  return Context;
};

const useTodoDispatch = () => {
  const Context = React.useContext(TodoDispatch);

  if (Context === undefined) {
    throw new Error('useTodoDispatch must be whithin Provider');
  }

  return Context;
};

const useTodo = () => {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  return [state, dispatch];
};

export { useTodo, TodoProvider, useTodoState, useTodoDispatch };
