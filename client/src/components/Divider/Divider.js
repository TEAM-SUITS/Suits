import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const HorizontalLine = styled.div`
  height: ${({ $height }) => ($height ? $height : '1px')};
  width: ${({ $width }) => ($width ? $width : '100%')};
  background-color: ${({ $color }) => ($color ? $color : 'var(--color-gray4)')};
  margin: ${({ margin }) => (margin ? margin : '1em auto')};
  min-width: ${({ minWidth }) => minWidth};
`;

/* -------------------------------------------------------------------------- */

export default function Divider({ primary, height, width, color, margin, minWidth, ...restProps }) {
  return (
    <HorizontalLine
      $height={height}
      $width={width}
      $color={primary ? '#EB5022' : color}
      minWidth={minWidth}
      margin={margin}
      {...restProps}
    />
  );
}

/* -------------------------------- proptypes ------------------------------- */

HorizontalLine.propTypes = {
  height: string,
  width: string,
  color: string,
  margin: string,
};
