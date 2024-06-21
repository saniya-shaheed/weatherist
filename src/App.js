import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesLayout from "./RoutesLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/weatherist">
        <RoutesLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
