import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import ToggleColorModeProvider from "./utils/ToggleColorMode";

import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <App />
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);
