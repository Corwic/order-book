import React from "react";
import ReactDOM from "react-dom";
import "./styles/_global.scss";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
