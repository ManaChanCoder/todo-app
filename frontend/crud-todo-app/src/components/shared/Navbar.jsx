import React from "react";
import "./both.css";

// store
import { themeStore, modalOpenner } from "../../store/manyStore";

// icons
import {
  MdOutlineAddBox,
  MdOutlineLightMode,
  MdDarkMode,
} from "react-icons/md";

const Navbar = () => {
  const { isDark, toggleTheme } = themeStore();
  const toggleOpenModal = modalOpenner((state) => state.toggleOpenModal);

  return (
    <div
      className={`w-full flex text-white justify-between items-center px-5 py-2 ${
        isDark ? "bg-deep-brown" : "bg-soft-red"
      }`}
    >
      <h2 className="text-3xl">Todo App</h2>
      <div className="flex gap-3">
        <MdOutlineAddBox
          onClick={toggleOpenModal}
          size={30}
          className="cursor-pointer"
        />
        {isDark ? (
          <MdOutlineLightMode
            onClick={toggleTheme}
            size={30}
            className="cursor-pointer"
          />
        ) : (
          <MdDarkMode
            onClick={toggleTheme}
            size={30}
            className="cursor-pointer text-black"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
