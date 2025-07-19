import { useDispatch, useSelector } from "react-redux";
import reducer, {
  deleteTodo,
  editTodo,
  sortTodo,
  toggleTodo,
} from "../feature/todo/todoSlice";
import { useState } from "react";

const TodoList = () => {
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState();
  const { todos } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const handleEditClick = (res) => {
    setEditId(res.id);
    setEditValue(res.title);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    dispatch(editTodo({ id, value: editValue | 'latest' }));
    setEditId(null);
    setEditValue("");
  };
  const handleChangeSort = (e) => {
    if (e.target.value === "earliest") {
      dispatch(sortTodo({ key: "createdAt", order: "desc" }));
    } else if (e.target.value === "latest") {
      dispatch(sortTodo({ key: "createdAt", order: "asc" }));
    }
  };

  const completedTodo = todos.filter((todo) => todo.isCompleted);
  console.log("completedTodo", completedTodo);
  return (
    <div>
      {/* nav */}
      {todos.length > 0 && (
        <div>
          <div>
            <ul className="flex justify-between mb-6 p-6 rounded-2xl bg-gray-50">
              <li>
                all{" "}
                <span className="bg-yellow-100 px-1.5 py-0.5 rounded-full">
                  {todos.length}
                </span>
              </li>
              <li>
                completed{" "}
                <span className="bg-yellow-100 px-1.5 py-0.5 rounded-full">
                  {completedTodo.length}
                </span>
              </li>
              <li>
                unCompleted{" "}
                <span className="bg-yellow-100 px-1.5 py-0.5 rounded-full">
                  {todos.length - completedTodo.length}
                </span>
              </li>
            </ul>
          </div>
          <div className="">
            <select
              name=""
              id=""
              className="border border-gray-300 p-1.5 rounded-xl text-gray-600 mb-1"
              onChange={handleChangeSort}
            >
              <option value="latest">قدیمی ترین</option>
              <option value="earliest">جدید ترین</option>
            </select>
          </div>
        </div>
      )}
      <ul className="space-y-4">
        {/* Todo Items */}
        {todos.map((res) => (
          <li
            key={res.id}
            className={`flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm border border-gray-200 ${
              res.isCompleted && "bg-green-200"
            }`}
          >
            {editId === res.id ? (
              <form
                onSubmit={(e) => handleEditSubmit(e, res.id)}
                className="flex justify-center relative"
              >
                <input
                  type="text"
                  value={editValue}
                  placeholder={res.title}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="p-1.5 rounded-lg border pr-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  className="flex items-center justify-center m-0 p-0 bg-yellow-300 text-white w-6 h-6 rounded-md  top-1/2 -translate-y-1/2  hover:bg-yellow-400 absolute right-2.5"
                  type="submit"
                >
                  +
                </button>
              </form>
            ) : (
              <span className="text-gray-700">{res.title}</span>
            )}
            <span
              className={`p-1 text-xs rounded-lg ${
                res.isCompleted
                  ? "bg-green-400 text-green-900"
                  : "bg-red-200 text-red-900"
              }`}
            >
              completed ? {res.isCompleted ? "yes" : "no"}
            </span>
            <div className="flex items-center gap-2">
              {!res.isCompleted && (
                <div className="flex gap-2">
                  <button
                    className="text-sm text-white bg-yellow-500 px-3 py-1 rounded-lg hover:bg-yellow-600"
                    onClick={() => handleEditClick(res)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-sm cursor-pointer text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                    onClick={() => dispatch(deleteTodo({ id: res.id }))}
                  >
                    Delete
                  </button>
                </div>
              )}

              <input
                type="checkbox"
                className={`w-5 h-5 rounded-lg accent-white cursor-pointer flex justify-self-center items-center `}
                onChange={() => {
                  dispatch(toggleTodo({ id: res.id }));
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
