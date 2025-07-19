import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload.title,
        isCompleted: false,
        createdAt: Date.now(),
      });
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      selectedTodo.isCompleted = !selectedTodo.isCompleted;
    },
    deleteTodo: (state, action) => {
      const deleteTodo = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      state.todos = deleteTodo;
    },
    editTodo: (state, action) => {
      const editedTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      editedTodo.title = action.payload.value;
    },
    sortTodo: (state, action) => {
      // payload = { key: 'createdAt', order: 'asc' | 'desc' }
      const { key, order } = action.payload;
      state.todos = [...state.todos].sort((a, b) => {
       if (key === "createdAt") {
          if (order === "asc") return a.createdAt - b.createdAt;
          else return b.createdAt - a.createdAt;
        }
        return 0;
      });
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, sortTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
