import { createGlobalStyle } from "styled-components";

/* 전역 스타일--------------------------------------------------------- */

export const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'MuseoModerno', "Spoqa Han Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans";
    margin: 0 auto;
  }

  html {
    /* 색상 변수 */
    --color-white: #FFF;
    --color-black: #101010;
    --color-lightgray1: #FAFAFA;
    --color-lightgray2: #F0F0F0;
    --color-gray1: #CCC;
    --color-gray2: #AAA;
    --color-gray3: #555;
    --color-red: #DD2222;
    --color-green1: #5F885F;
    --color-green2: #6FCF97;
    --color-orange: #F2994A;
    --color-purple: #9B51E0;
    --color-blue1: #2998D4;
    --color-blue2: #56CCF2;
    --color-yellow: #ECB312;
  }
`;
