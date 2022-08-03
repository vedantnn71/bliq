import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/globals.css";

const root = document.createElement("div");
root.id = "crx-root";

document.body.append(root);

ReactDOM.createRoot(document.getElementById("crx-root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
