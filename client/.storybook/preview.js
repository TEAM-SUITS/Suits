import React from 'react';
import { GlobalStyle } from '../src/styles/pages/theme.styled';
import { StoreProvider } from 'redux/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'styles/pages/Themes';

let modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'dialog-container');
document.querySelector('body').appendChild(modalRoot);

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <StoreProvider>
        <GlobalStyle />
        <Story />
      </StoreProvider>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
