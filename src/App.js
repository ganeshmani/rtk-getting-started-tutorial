import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
// import "./App.css";
import './index.css';
import Product from './features/product'
function App() {
  return (
    <div className="container mx-auto p-4">
      <Product />
    </div>
  );
}

export default App;
