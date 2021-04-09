import React from "react";
import { bool, string, node } from "prop-types";
import styled from "styled-components";
import { boxShadowBlack, textShadowBlack } from "styles/common/common.styled";
import Icon from "components/Icon/Icon";
import Divider from "components/Divider/Divider";

/* ---------------------------- styled components ---------------------------- */

const CardBox = styled.div`
  ${boxShadowBlack}
  position: relative;
  min-width: 305px;
  border-radius: 10px;
  background-color: var(--color-lightgray);
  padding: 1em 2em 1.4em;

  & > h2 {
    color: var(--color-gray3);
  }
`;

/* -------------------------------------------------------------------------- */

export default function Card({ isQuestion, title, children, ...restProps }) {
  return (
    <CardBox {...restProps}>
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
          <Divider primary />
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
    font-size: 1.4em;
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
