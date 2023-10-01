import { Dispatch, FC, ReactNode, createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../types";
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO } from "./actionTypes";

interface TodoState {
     todos: Todo[];
}

type TodoActionTypes =
     | { type: typeof ADD_TODO; payload: string }
     | { type: typeof REMOVE_TODO; payload: string }
     | { type: typeof TOGGLE_TODO; payload: string }
     | { type: typeof UPDATE_TODO; payload: { id: string; todo: Todo } };

interface TodoContextType {
     state: TodoState;
     dispatch: Dispatch<TodoActionTypes>;
}

const TodoContext = createContext<TodoContextType | null>(null);

// Get all stored TODO from LocalStorage
const todosFromLS = JSON.parse(localStorage.getItem("TODOS")!);

const todoReducer = (state: TodoState, action: TodoActionTypes): TodoState => {
     switch (action.type) {
          case ADD_TODO:
               const todo: Todo = {
                    id: uuidv4(),
                    title: action.payload,
                    completed: false,
               };
               const newTodos = { todos: [...state.todos, todo] };

               // Set the new TODO state in LocalStorage
               localStorage.setItem("TODOS", JSON.stringify(newTodos));
               return newTodos;
          case REMOVE_TODO:
               const filteredTodo = { todos: state.todos.filter(todo => todo.id !== action.payload) };
               // Set the new TODO state in LocalStorage
               localStorage.setItem("TODOS", JSON.stringify(filteredTodo));
               return filteredTodo;
          case TOGGLE_TODO:
               const updatedTodos = { todos: state.todos.map(todo => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)) };
               // Set the new TODO state in LocalStorage
               localStorage.setItem("TODOS", JSON.stringify(updatedTodos));
               return updatedTodos;
          case UPDATE_TODO:
               const editedTodos = { todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload.todo : todo)) };
               // Set the new TODO state in LocalStorage
               localStorage.setItem("TODOS", JSON.stringify(editedTodos));
               return editedTodos;
          default:
               return state;
     }
};

const initialState: TodoState = todosFromLS;

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
     const [state, dispatch] = useReducer(todoReducer, initialState);
     return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
     const context = useContext(TodoContext);
     if (!context) {
          throw new Error("useTodo must be used within a todo provider!");
     }
     return context;
};
