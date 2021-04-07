import { createGlobalStyle } from 'styled-components';

/* 전역 스타일--------------------------------------------------------- */

export const GlobalColors = createGlobalStyle`
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
    --color-green: #5F885F;
    --color-orange: #F2994A;
    --color-purple: #9B51E0;
    --color-blue: #2998D4;
    --color-yellow: #ECB312;
  }
`;