import { useEffect, useState } from "react";
import { useTodo } from "../../context/TodoContext";
import Form from "./Form";
import Todo from "./Todo";
import { Todo as TodoTypes } from "../../types";

const TodoComponent = () => {
     const { state } = useTodo();
     const [todos, setTodos] = useState<TodoTypes[]>([]);
     const [status, setStatus] = useState("incomplete");

     useEffect(() => {
          if (status === "all") {
               setTodos(state.todos);
          } else if (status === "complete") {
               setTodos(state.todos.filter(todo => todo.completed === true));
          } else if (status === "incomplete") {
               setTodos(state.todos.filter(todo => todo.completed === false));
          }
     }, [state.todos, status]);

     return (
          <div className="max-w-4xl p-6 pb-20 mx-auto mt-20 space-y-4 lg:p-0">
               <h3 className="text-4xl font-bold text-center text-orange-500">Todo</h3>
               <div>
                    <Form />
                    <div className="flex flex-col gap-3 mt-10">
                         {todos.length === 0 ? (
                              <p className="text-center text-orange-400 ">Todo list empty</p>
                         ) : (
                              todos?.map(todo => <Todo todo={todo} key={todo.id} />)
                         )}
                    </div>
                    <div className="mt-2 text-lg font-bold text-orange-500">
                         <span className="cursor-pointer" onClick={() => setStatus("all")}>
                              All
                         </span>{" "}
                         |{" "}
                         <span className="cursor-pointer" onClick={() => setStatus("complete")}>
                              Completed
                         </span>{" "}
                         |{" "}
                         <span className="cursor-pointer" onClick={() => setStatus("incomplete")}>
                              Incomplete
                         </span>
                    </div>
               </div>
          </div>
     );
};

export default TodoComponent;
