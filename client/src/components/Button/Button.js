import React from "react";
import styled, { css } from "styled-components";
import Icon from "components/Icon/Icon";
import { museoMedium, textShadowBlack } from "styles/common/common.styled";
import { string, node, bool } from "prop-types";
import { motion } from "framer-motion";
import useDetectViewport from "hooks/useDetectViewport";

/* ---------------------------- styled components --------------------------- */

const StyledButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  ${museoMedium}
  ${textShadowBlack};
  border: none;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  ${({ outline }) =>
    outline &&
    css`
      border-radius: 1em;
      padding: 0.625em;
      background-color: ${({ disabled }) =>
        disabled ? "var(--color-white)" : "var(--color-gray2)"};
    `};
`;

/* ------------------------------------------------------------------------- */

export default function Button({
  icon,
  outline,
  children,
  width,
  height,
  isLoading,
  disabled,
  title,
  isMobile,
  ...restProps
}) {
  return (
    <StyledButton
      whileHover={isMobile ? null : { scale: 1.1 }}
      outline={outline}
      width={width}
      height={height}
      disabled={disabled}
      {...restProps}
    >
      {icon && <Icon type={icon} title={title} />}
      {isLoading ? "Loading..." : children}
    </StyledButton>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Button.propTypes = {
  outline: bool,
  children: node,
  icon: string,
  width: string,
  height: string,
  isLoading: bool,
  disabled: bool,
  title: string,
};
