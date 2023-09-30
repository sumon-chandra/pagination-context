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

const todoReducer = (state: TodoState, action: TodoActionTypes): TodoState => {
     switch (action.type) {
          case ADD_TODO:
               const todo: Todo = {
                    id: uuidv4(),
                    title: action.payload,
                    completed: false,
               };
               return { todos: [...state.todos, todo] };
          case REMOVE_TODO:
               return { todos: state.todos.filter(todo => todo.id !== action.payload) };
          case TOGGLE_TODO:
               return { todos: state.todos.map(todo => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)) };
          default:
               return state;
     }
};
const initialState: TodoState = {
     todos: [],
};

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
