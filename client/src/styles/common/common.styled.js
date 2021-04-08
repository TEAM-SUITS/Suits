import { css } from 'styled-components';

/* -------------------------------------------------------------------------- */

export const a11yHidden = css`
  overflow: hidden;
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  white-space: nowrap;
`;

export const resetBoxModel = css`
  margin: 0;
  border: 0;
  padding: 0;
`;

export const resetList = css`
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style-type: none;
`;

export const boxShadowBlack = css`
  box-shadow: 0 1px 3px #00000025;
`;

export const boxShadowWhite = css`
  box-shadow: 0 1px 3px #ffffff50;
`;

export const textShadowBlack = css`
  text-shadow: 0 1px 3px #00000025;
`;

export const museoLarge = css`
  font: 700 24px 'Museo Moderno', serif;
`;

export const museoMedium = css`
  font: 400 18px 'Museo Moderno', serif;
`;

export const museoSmall = css`
  font: 400 14px 'Museo Moderno', serif;
`;

export const spoqaLarge = css`
  font: 400 20px 'Spoqa Han Sans', sans-serif;
`;

export const spoqaMedium = css`
  font: 400 16px 'Spoqa Han Sans', sans-serif;
`;

export const spoqaMediumLight = css`
  font: 200 16px 'Spoqa Han Sans', sans-serif;
`;

export const spoqaSmall = css`
  font: 400 14px 'Spoqa Han Sans', sans-serif;
`;

export const spoqaSmallBold = css`
  font: 700 14px 'Spoqa Han Sans', sans-serif;
`;
