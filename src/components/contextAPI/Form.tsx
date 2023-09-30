import { FormEvent, ChangeEvent, useState } from "react";
import { useTodo } from "../../context/TodoContext";
// import { addTodo, removeTodo } from "../../context/actions";
import { ADD_TODO } from "../../context/actionTypes";
const Form = () => {
     const [todoTitle, setTodoTitle] = useState("");
     const { dispatch } = useTodo();
     const getTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
          setTodoTitle(e.target.value);
     };
     const handleAddTodo = (e: FormEvent) => {
          e.preventDefault();
          dispatch({ type: ADD_TODO, payload: todoTitle });
          setTodoTitle("");
     };
     return (
          <form onSubmit={handleAddTodo} className="flex items-center justify-center gap-4">
               <input
                    className="w-1/2 px-3 py-2 border border-orange-500 rounded-lg"
                    type="text"
                    placeholder="What's in your mind?"
                    value={todoTitle}
                    onChange={getTodoTitle}
               />
               <button type="submit" className="px-4 py-2 font-bold text-white uppercase bg-orange-500 rounded-lg ">
                    Add
               </button>
          </form>
     );
};

export default Form;
