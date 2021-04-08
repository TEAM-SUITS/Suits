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

  svg {
    position: absolute;
  }

  svg:first-child {
    left: 2em;
    top: 1em;
  }

  svg:last-of-type {
    right: 2em;
    top: 2em;
  }
`;

/* -------------------------------------------------------------------------- */

export default function Card({ isQuestion, title, children, ...restProps }) {
  console.log(children);
  return (
    <CardBox {...restProps}>
      <CardBox.Header>
        {isQuestion ? (
          <>
            <Icon type="quote-left" />
            <Icon type="quote-right" />
          </>
        ) : null}
        <h2>{title}</h2>
      </CardBox.Header>
      <Divider primary />
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
`;

CardBox.Content = styled.div`
  width: 80%;
  margin: 0 auto;
`;

/* -------------------------------- proptypes ------------------------------- */

Card.propTypes = {
  isQuestion: bool,
  title: string.isRequired,
  children: node,
};
