import React from "react";
import "./components/main.css";
import { themeStore } from "./store/manyStore";

// components & store
import Navbar from "./components/shared/Navbar";
import Todo from "./components/Todo";
import Footer from "./components/shared/Footer";

const App = () => {
  const isDark = themeStore((state) => state.isDark);
  return (
    <div
      className={`bg-black flex flex-col justify-between h-screen ${
        isDark ? "dark-chocolate" : "bg-white"
      }`}
    >
      <Navbar />
      <Todo />
      <Footer />
    </div>
  );
};

export default App;
