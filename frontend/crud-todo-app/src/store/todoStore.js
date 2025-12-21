import { create } from "zustand";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_URL;
const todoStore = create((set, get) => ({
  todos: [],
  filteredTodos: [],
  loading: false,
  error: null,

  getTodos: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${baseURL}/api/todos`);

      if (!res.ok) throw new Error("Failed to fetch notes.");
      const data = await res.json();
      set({
        todos: data.data,
        filteredTodos: data.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  createTodos: async (newTodo) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${baseURL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!res.ok) {
        toast(res.message || "Failed to create note.");
        set({ loading: false });
        return false;
      }
      const data = await res.json();
      set((state) => ({
        todos: [data.data, ...state.todos],
        filteredTodos: [data.data, ...state.todos],
        loading: false,
        error: null,
      }));
      return true;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  updateTodos: async (id, updateTodo) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${baseURL}/api/todos/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTodo),
      });

      if (!res.ok) {
        toast(res.message || "Failed to update note.");
        set({ loading: false });
        return false;
      }
      const data = await res.json();
      toast(data.message || "Note update successfully");
      set((state) => {
        const updated = state.todos.map((todo) =>
          todo._id === id ? { _id: id, ...updateTodo } : todo
        );
        return {
          todos: updated,
          filteredTodos: updated,
        };
      });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast(error.message);
    }
  },
  deleteTodos: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${baseURL}/api/todos/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toast(res.message || "Failed to delete note.");
        set({ loading: false });
        return false;
      }
      const data = await res.json();
      set((state) => {
        const deleted = state.todos.filter((todo) => todo._id !== id);
        return {
          todos: deleted,
          filteredTodos: deleted,
          loading: false,
        };
      });
      toast(data.message || "Delete Successfully");
      return true;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  searchTodos: (keyword) => {
    const { todos } = get();
    if (!keyword) {
      set({ filteredTodos: todos });
    } else {
      const results = todos.filter((todo) =>
        todo.todo.toLowerCase().includes(keyword.toLowerCase())
      );
      set({ filteredTodos: results });
    }
  },
}));

export default todoStore;
