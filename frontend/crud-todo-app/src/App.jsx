import React from "react";

// components & store
import Navbar from "./components/shared/Navbar";
import Todo from "./components/Todo";
import Footer from "./components/shared/Footer";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Todo />
      <Footer />
    </div>
  );
};

export default App;
