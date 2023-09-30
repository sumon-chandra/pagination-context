import { Todo } from "../types";
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO } from "./actionTypes";

export const addTodo = (todoTitle: string) => ({
     type: ADD_TODO,
     payload: todoTitle,
});

export const removeTodo = (id: string) => {
     return {
          type: REMOVE_TODO,
          payload: id,
     };
};
export const toggleTodo = (id: string) => {
     return {
          type: TOGGLE_TODO,
          payload: id,
     };
};
export const updateTodo = (id: string, todo: Todo) => {
     return {
          type: UPDATE_TODO,
          payload: {
               id,
               todo,
          },
     };
};
