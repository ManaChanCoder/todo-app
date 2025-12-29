import React, { useEffect, useState } from "react";
import "./main.css";
import SpinnerLoading from "../../public/spinner-loader.svg";

// store & components & toastify
import { themeStore, modalOpenner } from "../store/manyStore";
import TodoCard from "./TodoCard";
import TodoModal from "../Modal/TodoModal";
import todoStore from "../store/todoStore";
import { ToastContainer } from "react-toastify";
import EditModal from "../Modal/EditModal";
import ViewNote from "../Modal/ViewNote";

const Todo = () => {
  const isDark = themeStore((state) => state.isDark);
  const {
    isOpenModal,
    toggleOpenModal,
    isEditing,
    closeEditModal,
    isViewing,
    closeViewModal,
  } = modalOpenner();
  const {
    todos,
    loading,
    filteredTodos,
    getTodos,
    createTodos,
    updateTodos,
    searchTodos,
  } = todoStore();
  const [newTodo, setNewTodos] = useState({
    todo: "",
    description: "",
  });
  const currentTodo = todos.find((t) => t._id === isViewing);

  useEffect(() => {
    getTodos();
    if (isEditing !== null) {
      const todoEdit = todos.find((todo) => todo._id === isEditing);
      if (todoEdit) {
        setNewTodos({
          todo: todoEdit.todo,
          description: todoEdit.description,
        });
      }
    }
  }, [getTodos, isEditing]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewTodos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addTodo = async () => {
    const saveTodo = await createTodos(newTodo);
    if (saveTodo) {
      toggleOpenModal();
      setNewTodos({
        todo: "",
        description: "",
      });
    }
  };
  const updateItem = async () => {
    const updatedTodo = await updateTodos(isEditing, newTodo);
    if (updatedTodo) {
      setNewTodos({
        todo: "",
        description: "",
      });
      closeEditModal();
    }
  };
  const enterKey = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className={`text-white px-5 pb-5 ${isDark ? "dark-chocolate" : ""}`}>
      <ToastContainer autoClose={1000} newestOnTop />
      {/* Add Todo */}
      <TodoModal
        isOpen={isOpenModal}
        isClose={toggleOpenModal}
        title="Add New Note"
      >
        <div className="flex flex-col my-3">
          <label htmlFor="">Note name</label>
          <input
            type="text"
            name="todo"
            value={newTodo.todo}
            onChange={handleOnChange}
            className={`w-full px-2 py-1 mt-2.5 outline-none rounded-sm ${
              isDark ? "bg-white text-black" : "bg-cyan-100 text-black"
            }`}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            value={newTodo.description}
            onChange={handleOnChange}
            onKeyDown={enterKey}
            rows={5}
            className={`w-full px-2 py-1 mt-2.5 outline-none rounded-sm ${
              isDark ? "bg-white text-black" : "bg-cyan-100 text-black"
            }`}
          ></textarea>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={toggleOpenModal}
            className="cursor-pointer text-white bg-blue-500 hover:bg-red-500 duration-150 rounded-md px-3 py-2"
          >
            Close
          </button>
          <button
            onClick={addTodo}
            className="cursor-pointer text-white bg-blue-500 hover:bg-green-700 duration-150 rounded-md px-3 py-2"
          >
            Save
          </button>
        </div>
      </TodoModal>

      <EditModal
        isOpen={isEditing !== null}
        isClose={closeEditModal}
        title="Edit note"
      >
        <div className="flex flex-col my-3">
          <label htmlFor="">Note name</label>
          <input
            type="text"
            name="todo"
            value={newTodo.todo}
            onChange={handleOnChange}
            className={`w-full px-2 py-1 mt-2.5 outline-none rounded-sm ${
              isDark ? "bg-white text-black" : "bg-cyan-100 text-black"
            }`}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            value={newTodo.description}
            onChange={handleOnChange}
            rows={5}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateItem();
            }}
            className={`w-full px-2 py-1 mt-2.5 outline-none rounded-sm ${
              isDark ? "bg-white text-black" : "bg-cyan-100 text-black"
            }`}
          ></textarea>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={closeEditModal}
            className="cursor-pointer text-white bg-blue-500 hover:bg-red-500 duration-150 rounded-md px-3 py-2"
          >
            Close
          </button>
          <button
            onClick={updateItem}
            className="cursor-pointer text-white bg-blue-500 hover:bg-green-700 duration-150 rounded-md px-3 py-2"
          >
            Edit
          </button>
        </div>
      </EditModal>

      {currentTodo && (
        <ViewNote
          isOpen={isViewing !== null}
          isClose={closeViewModal}
          title={currentTodo.todo}
          description={currentTodo.description}
        />
      )}

      {todos.length > 0 ? (
        <div className="flex justify-center w-full pt-5">
          <input
            type="text"
            onChange={(e) => searchTodos(e.target.value)}
            className={`w-96 bg-soft-pink text-lg px-3 py-1.5 outline-none rounded-sm ${
              isDark ? "dark-brown" : "text-black"
            }`}
            placeholder="Search..."
          />
        </div>
      ) : null}

      <div className="pt-5">
        {todos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center">
            {filteredTodos.map((todo, index) => (
              <TodoCard
                key={index}
                todo={todo.todo}
                description={todo.description}
                id={todo._id}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-64">
            {loading ? (
              <p
                className={`text-2xl text-center ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                <img
                  src={SpinnerLoading}
                  alt="Loading..."
                  className="h-25 w-25"
                />
              </p>
            ) : (
              <p
                className={`text-2xl text-center ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                No Data Found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
