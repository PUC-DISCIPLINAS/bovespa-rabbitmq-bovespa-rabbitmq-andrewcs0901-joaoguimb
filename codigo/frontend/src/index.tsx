import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./AppStyle";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
