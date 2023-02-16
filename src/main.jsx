import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router  } from "react-router-dom";
import App from "./App";
// style
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'

// axios
import axios from "axios";
axios.defaults.baseURL = "https://nt-devconnector.onrender.com";
axios.defaults.headers.common["Content-Type"] = "application/json";
let token = localStorage.getItem("token")
if (token) axios.defaults.headers.common["x-auth-token"] = `${token}`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
      <App />
      <ToastContainer />
  </Router>
);
