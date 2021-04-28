import { createGlobalStyle } from 'styled-components';

/* 전역 스타일--------------------------------------------------------- */

export const GlobalStyle = createGlobalStyle`

/* ---------------- 사용자 정의 초기화 --------------------------------------- */
  
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #212121;
    font-size: 10px;
    max-width: 944px;
    background-color: ${(props) => props.theme.gray1};
    color: ${(props) => props.theme.text};
    transition: all 0.25s linear;
    // 참고: https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
  }

  body,
  body *,
  body::before,
  body::after,
  body *::before,
  body *::after {
    box-sizing: border-box;
    max-width: 944px;
    font-size: 10px;
  }

  img {
    vertical-align: middle;
  }

  button {
    user-select: none;
    cursor: pointer;
  }
  
  abbr[title] {
    cursor: help;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  a {
    text-decoration: none;
    color: inherit;
  }


  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

  svg {
    path{

    fill: var(--color-text);
    }
  }

/* ------------------------------- 사용자 정의 스타일 ------------------------------- */

  body {
    font-family: 'MuseoModerno', "Spoqa Han Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans";
    margin: 0 auto;
    font-size: 10px;
    max-width: 944px;
  }
  
  html {
    font-size: 10px;
    /* 색상 변수 */
    --color-body: ${(props) => props.theme.body};
    --color-text: ${(props) => props.theme.text};
    --color-gray1: ${(props) => props.theme.gray1};
    --color-gray2: ${(props) => props.theme.gray2};
    --color-gray3: ${(props) => props.theme.gray3};
    --color-gray4: ${(props) => props.theme.gray4};
    --color-gray5: ${(props) => props.theme.gray5};
    --color-black: ${(props) => props.theme.black};
    --color-white: ${(props) => props.theme.white};
    --color-red: #DD2222;
    --color-green1: #9ab59a;
    --color-green2: #6FCF97;
    --color-orange: #F2994A;
    --color-purple: #c196e9;
    --color-blue1: #2998D4;
    --color-blue2: #56CCF2;
    --color-yellow: #ECB312;
    --color-orange: #EB5022;
    --color-orange2: #ff987a;
  }

  .react-confirm-alert-overlay {
    background: rgba(97, 97, 97, 0.6);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
  }
`;

/* for Storybook --------------------------------------------------------- */

export const StorybookStyle = createGlobalStyle`

/* ---------------- 사용자 정의 초기화 --------------------------------------- */
  
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #212121;
    font-size: 10px;
    max-width: 944px;
    background-color: #FAFAFA;
    color: #101010;
    transition: all 0.25s linear;
    // 참고: https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
  }

  body,
  body *,
  body::before,
  body::after,
  body *::before,
  body *::after {
    box-sizing: border-box;
    max-width: 944px;
    font-size: 10px;
  }

  img {
    vertical-align: middle;
  }

  button {
    user-select: none;
    cursor: pointer;
  }
  
  abbr[title] {
    cursor: help;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  a {
    text-decoration: none;
    color: inherit;
  }


  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

  svg {
    path{

    fill: var(--color-text);
    }
  }

/* ------------------------------- 사용자 정의 스타일 ------------------------------- */

  body {
    font-family: 'MuseoModerno', "Spoqa Han Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans";
    margin: 0 auto;
    font-size: 10px;
    max-width: 944px;
  }
  
  html {
    font-size: 10px;
    /* 색상 변수 */
    --color-body: #FFF;
    --color-text: #101010;
    --color-gray1: #FAFAFA;
    --color-gray2: #D5D5D5;
    --color-gray3: #CCC;
    --color-gray4: #AAA;
    --color-gray5: #333;
    --color-black: #000;
    --color-white: #FFF;
    --color-red: #DD2222;
    --color-green1: #5F885F;
    --color-green2: #6FCF97;
    --color-orange: #F2994A;
    --color-purple: #9B51E0;
    --color-blue1: #2998D4;
    --color-blue2: #56CCF2;
    --color-yellow: #ECB312;
    --color-orange: #EB5022;
  }

  .react-confirm-alert-overlay {
    background: rgba(97, 97, 97, 0.6);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
  }
`;
