import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { render } from "react-dom";
import "./styles/index.scss";

import App from "./app/App";
import { StoreProvider } from "redux/store";

render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
  document.getElementById("root")
);
