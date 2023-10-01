import { useTodo } from "../../context/TodoContext";
import { TOGGLE_TODO } from "../../context/actionTypes";
import { Todo } from "../../types";

type Props = {
     todo: Todo;
};

export default function Todo({ todo }: Props) {
     const { dispatch } = useTodo();
     const handleToggle = (id: string) => {
          dispatch({ type: TOGGLE_TODO, payload: id });
     };
     return (
          <div className={`flex items-center justify-start gap-4 p-2 text-sm font-semibold bg-white border border-orange-500 rounded-md shadow-lg`}>
               <input type="checkbox" className="accent-orange-500/25" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
               <input type="text" readOnly value={todo.title} className={`${todo.completed && "font-normal text-gray-600"}`} />
          </div>
     );
}
