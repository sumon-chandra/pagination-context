import { useTodo } from "../../context/TodoContext";
import Form from "./Form";
import Todo from "./Todo";

const TodoComponent = () => {
     const { state } = useTodo();
     console.log(state.todos);

     return (
          <div className="max-w-4xl pb-20 mx-auto mt-20 space-y-4">
               <h3 className="text-4xl font-bold text-center text-orange-500">Todo</h3>
               <div>
                    <Form />
                    <div className="flex flex-col gap-3 mt-10">
                         {state?.todos?.map(todo => (
                              <Todo todo={todo} key={todo.id} />
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default TodoComponent;
