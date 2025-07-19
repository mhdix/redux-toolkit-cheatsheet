import { Provider } from "react-redux";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import store from "./feature/store";

function App() {
  return (
    <Provider store={store}>
      <div className="max-w-xl mx-auto h-screen grid grid-cols-1 grid-rows-4 gap-4 px-4">
        <div className="row-span-1 relative">
          <AddTodo />
        </div>
        <div className="row-span-3">
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
