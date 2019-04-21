import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/app/App";
import "normalize.css";
import "./index.css";

const rootEl = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  rootEl
);

/* if (module.hot) {
  module.hot.accept("./components/app/App", () => {
    const NextApp = require("./components/app/App").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
 */
