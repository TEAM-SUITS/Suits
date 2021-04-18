import React from "react";
import styled, { css } from "styled-components";
import Icon from "components/Icon/Icon";
import { textShadowBlack } from "styles/common/common.styled";

const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  ${textShadowBlack};
  ${({ outline }) =>
    outline &&
    css`
      border-radius: 1em;
      padding: 10px;
      background-color: var(--color-gray2);
    `}
`;

export default function IconLinkA({
  href,
  external,
  icon,
  outline,
  children,
  ...restProps
}) {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <StyledAnchor
      href={href}
      target={external ? "_blank" : null}
      rel={external ? "noopener noreferrer" : null}
      outline={outline}
      {...restProps}
    >
      {icon && <Icon type="search" />}
      {children}
    </StyledAnchor>
  );
}
