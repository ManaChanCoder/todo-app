import { create } from "zustand";
import { persist } from "zustand/middleware";

export const themeStore = create(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: "theme-storage",
    }
  )
);

export const modalOpenner = create((set) => ({
  isOpenModal: false,
  isEditing: null,
  isViewing: null,

  toggleOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
  openEditModal: (id) => set(() => ({ isEditing: id })),
  viewNoteModal: (id) => set(() => ({ isViewing: id })),
  closeEditModal: () => set(() => ({ isEditing: null })),
  closeViewModal: () => set(() => ({ isViewing: null })),
}));

export const editValueStore = create((set) => ({
  todos: [],
  todo: "",
  description: "",

  setEditValue: (id) => {
    set((state) => {
      const value = state.todos.find((todo) => todo._id === id);
      console.log(value?.todo);
      return {
        todo: value?.todo,
        description: value?.description,
      };
    });
  },
}));
