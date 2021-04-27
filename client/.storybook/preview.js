import React from "react";
import { GlobalStyle } from "./theme.styled";
import { StoreProvider } from "redux/store";

let modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "dialog-container");
document.querySelector("body").appendChild(modalRoot);

export const decorators = [
  (Story) => (
    <StoreProvider>
      <GlobalStyle />
      <Story />
    </StoreProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
