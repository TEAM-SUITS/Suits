import React from "react";
import { bool, string, node } from "prop-types";
import styled, { css } from "styled-components";
import { boxShadowBlack, textShadowBlack } from "styles/common/common.styled";
import Icon from "components/Icon/Icon";
import Divider from "components/Divider/Divider";

/* ---------------------------- styled components ---------------------------- */

const CardBox = styled.div`
  ${boxShadowBlack}
  position: relative;
  min-width: 305px;
  border-radius: 10px;
  background-color: var(--color-white);
  padding: 1em 2em 1.4em;
  max-height: 60vh;
  overflow: auto;
  color: var(--color-gray3);
  max-width: 688px;
  width: 100%;
  ${props =>
    !props.isQuestion &&
    !props.isDialog &&
    css`
      cursor: pointer;
    `
  }
`;

/* -------------------------------------------------------------------------- */

export default function Card({
  isQuestion,
  isDialog,
  title,
  onClick,
  children,
  ...restProps
}) {
  return (
    <CardBox
      onClick={onClick}
      role={isQuestion && !isDialog ? "button" : ""}
      aria-label={isQuestion && !isDialog ? "자세히 보기" : ""}
      title={isQuestion && !isDialog ? "자세히 보기" : ""}
      {...restProps}
    >
      {title && (
        <>
          <CardBox.Header>
            {isQuestion && (
              <>
                <Icon type="quote-left" />
                <Icon type="quote-right" />
              </>
            )}
            <h2>{title}</h2>
          </CardBox.Header>
          <Divider primary width="80%" />
        </>
      )}
      <CardBox.Content>{children}</CardBox.Content>
    </CardBox>
  );
}

/* --------------------------- compound components -------------------------- */

CardBox.Header = styled.div`
  h2 {
    display: block;
    font-weight: 700;
    text-align: center;
    color: var(--color-gray3);
    ${textShadowBlack}
    font-size: 1.6rem;
    padding: 0 2em;
  }
  & > svg {
    position: absolute;
    &:first-child {
      left: 2em;
      top: 1em;
    }
    &:nth-child(2) {
      right: 2em;
      top: 2em;
    }
  }
`;

CardBox.Content = styled.div`
  margin: 0 auto;
`;

/* -------------------------------- proptypes ------------------------------- */

Card.propTypes = {
  isQuestion: bool,
  title: string,
  children: node,
};
