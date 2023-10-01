import { useState, ChangeEvent } from "react";
import { useTodo } from "../../context/TodoContext";
import { REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../../context/actionTypes";
import { Todo } from "../../types";
import { FaEyeDropper, FaTrash, FaCheck } from "react-icons/fa6";

type Props = {
     todo: Todo;
};

export default function Todo({ todo }: Props) {
     const [isEditable, setIsEditable] = useState(false);
     const [updatedTodo, setUpdatedTodo] = useState<Todo>(todo);
     const { dispatch } = useTodo();
     const handleToggle = (id: string) => {
          dispatch({ type: TOGGLE_TODO, payload: id });
     };
     const handleRemoveTodo = (id: string) => {
          dispatch({ type: REMOVE_TODO, payload: id });
     };
     const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
          setUpdatedTodo({ ...updatedTodo, title: e.target.value });
     };
     const handleUpdateTodo = (id: string) => {
          dispatch({ type: UPDATE_TODO, payload: { id, todo: updatedTodo } });
          setIsEditable(false);
     };
     return (
          <div
               className={`flex duration-500 items-center justify-between gap-4 p-2 text-sm font-semibold bg-white border border-orange-500 rounded-md shadow-lg`}
          >
               <div className="flex items-center w-4/5 space-x-4">
                    <input type="checkbox" className="accent-orange-500/25" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
                    <input
                         type="text"
                         readOnly={!isEditable}
                         defaultValue={todo.title}
                         value={updatedTodo.title}
                         onChange={handleTitleChange}
                         className={`focus:outline-none w-full ${isEditable && "border px-2 font-normal bg-slate-300"} ${
                              todo.completed && "font-normal text-gray-600"
                         }`}
                    />
               </div>
               <div className="flex items-center gap-3">
                    {!isEditable && !todo.completed && (
                         <span onClick={() => setIsEditable(true)} className="cursor-pointer">
                              <FaEyeDropper />
                         </span>
                    )}

                    {isEditable && (
                         <span onClick={() => handleUpdateTodo(todo.id)} className="cursor-pointer">
                              <FaCheck />
                         </span>
                    )}

                    <span onClick={() => handleRemoveTodo(todo.id)} className="cursor-pointer">
                         <FaTrash />
                    </span>
               </div>
          </div>
     );
}
