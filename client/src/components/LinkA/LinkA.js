import React from "react";
import styled, { css } from "styled-components";
import Icon from "components/Icon/Icon";
import { textShadowBlack } from "styles/common/common.styled";
import { string, node, bool } from "prop-types";

/* ---------------------------- styled components --------------------------- */

const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.6rem;
  text-align: center;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  ${textShadowBlack};

  ${({ outline }) =>
    outline &&
    css`
      border-radius: 1em;
      padding: 0.625em;
      background-color: var(--color-gray2);
    `}
`;

/* ------------------------------------------------------------------------- */

export default function LinkA({
  href,
  external,
  icon,
  outline,
  children,
  width,
  height,
  ...restProps
}) {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <StyledAnchor
      href={href}
      target={external ? "_blank" : null}
      rel={external ? "noopener noreferrer" : null}
      outline={outline}
      width={width}
      height={height}
      {...restProps}
    >
      {icon && <Icon type={icon} />}
      {children}
    </StyledAnchor>
  );
}

/* -------------------------------- proptypes ------------------------------- */

LinkA.propTypes = {
  href: string.isRequired,
  external: bool,
  outline: bool,
  children: node,
  icon: string,
  width: string,
  height: string,
};
