import React from "react";
import styled from "styled-components";
import { string } from "prop-types";

const HorizontalLine = styled.hr`
  height: ${({ height }) => (height ? height : "1px")};
  width: ${({ width }) => (width ? width : "100%")};
  background-color: ${({ color }) => (color ? color : "var(--color-gray2)")};
  margin: ${({ margin }) => (margin ? margin : "1em 0")};
`;

/* -------------------------------------------------------------------------- */

export default function Divider({
  primary,
  height,
  width,
  color,
  margin,
  ...restProps
}) {
  return (
    <HorizontalLine
      height={height}
      width={width}
      color={primary ? "#EB5022" : color}
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
