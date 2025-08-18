import React from "react";

// store
import { themeStore } from "../store/manyStore";

// icons
import { MdClose } from "react-icons/md";

const TodoModal = ({ isOpen, isClose, title, children }) => {
  const isDark = themeStore((state) => state.isDark);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center  ${
        isDark ? "bg-white/30 text-black" : "bg-black/30 text-white"
      }`}
    >
      <div
        className={`fixed w-96 p-5 rounded-lg ${
          isDark ? "bg-black/20 text-white" : "bg-white/30 text-black"
        }`}
      >
        <h2 className="text-2xl">{title}</h2>
        <MdClose
          size={30}
          className="cursor-pointer absolute top-1 right-2.5 hover:text-red-500 duration-150"
          onClick={isClose}
        />
        {children}
      </div>
    </div>
  );
};

export default TodoModal;
