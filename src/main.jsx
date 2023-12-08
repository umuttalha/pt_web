// index.js
import React from "react";
import ReactDOM from "react-dom/client"
import App from "./app";
import { MyProvider } from "./UserContext";

import "../src/assets/styles/font.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>
);
