import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
// import "./App.css";
import './index.css';
import Products from "./features/Product/index";

function App() {
  return (
    <div className="container mx-auto p-4">
      <Products />
    </div>
  );
}

export default App;
