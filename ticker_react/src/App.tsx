import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RoutesSetup from "./routes/RoutesSetup";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RoutesSetup />
    </BrowserRouter>
  );
}

export default App;
