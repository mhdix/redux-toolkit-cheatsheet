import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../feature/todo/todoSlice";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!title) {
      return 
    }
    dispatch(addTodo({ title }));
    console.log(title);
    setTitle("");
  };
  return (
    <form
      className="flex items-center justify-center h-full mb-6"
      onSubmit={(e) => handleAddTodo(e)}
    >
      {/* Input Section */}
      <input
        type="text"
        placeholder="Add a new todo..."
        className="flex-1 p-2 pl-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        className="bg-blue-500 text-white p-2.5 m-0 px-4 rounded-r-lg hover:bg-blue-600 text-sm"
        type="submit"
      >
        +
      </button>
    </form>
  );
};

export default AddTodo;
