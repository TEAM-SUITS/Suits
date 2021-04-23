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
    background-color: var(--color-gray1);
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
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
`;
