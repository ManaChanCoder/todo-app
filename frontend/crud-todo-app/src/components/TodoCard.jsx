import Reac from "react";
import "./main.css";

// icons
import { MdModeEdit, MdDelete } from "react-icons/md";

// component & store
import { themeStore, modalOpenner } from "../store/manyStore";
import todoStore from "../store/todoStore";

const TodoCard = (props) => {
  const isDark = themeStore((state) => state.isDark);
  const { todo, description, id } = props;
  const { openEditModal } = modalOpenner();
  const deleteTodos = todoStore((state) => state.deleteTodos);

  const deleteItem = async (id) => {
    await deleteTodos(id);
  };

  return (
    <div
      className={`flex flex-col h-full justify-between px-5 py-3 text-center rounded-lg duration-150 sm:hover:scale-y-95 hover:scale-x-95 ${
        isDark ? "bg-charcoal shadow-xl" : "shadow-xl bg-brick-red text-black"
      }`}
    >
      <h1 className="text-xl font-semibold tracking-wider mb-3">{todo}</h1>
      <p className="tracking-wide text-base">{description}</p>

      <div className="mt-3 flex justify-end gap-3">
        <MdModeEdit
          size={25}
          onClick={() => openEditModal(id)}
          className="cursor-pointer hover:text-blue-400 duration-200 ease-in"
        />
        <MdDelete
          size={25}
          onClick={() => deleteItem(id)}
          className="cursor-pointer hover:text-red-500 duration-200 ease-in"
        />
      </div>
    </div>
  );
};

export default TodoCard;
