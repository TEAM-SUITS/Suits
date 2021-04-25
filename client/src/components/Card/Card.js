import React from "react";
import { bool, string, node, array } from "prop-types";
import styled, { css } from "styled-components";
import {
  boxShadowBlack,
  resetList,
  textShadowBlack,
} from "styles/common/common.styled";
import Icon from "components/Icon/Icon";
import Divider from "components/Divider/Divider";
import Hashtag from "components/Hashtag/Hashtag";

/* ---------------------------- styled components ---------------------------- */

const CardBox = styled.div`
  ${boxShadowBlack}
  cursor: ${(props) =>
    props.isQuestion && !props.isDialog ? "pointer" : "initial"};
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
`;

const TagList = styled.ul`
  ${resetList};
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 1em auto;

  @media screen and (max-width: 480px) {
    ${({ hasButton }) =>
      hasButton &&
      css`
        margin-top: 4em;
      `}
  }

  li {
    margin: 0 auto;
  }
`;
/* -------------------------------------------------------------------------- */

export default function Card({
  isQuestion,
  isDialog,
  title,
  tags,
  onClick,
  children,
  hasButton,
  ...restProps
}) {
  const handleKeyDown = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      onClick && onClick();
    }
  };

  return (
    <CardBox
      isQuestion={isQuestion}
      isDialog={isDialog}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isQuestion && !isDialog ? "button" : ""}
      aria-label={isQuestion && !isDialog ? "자세히 보기" : ""}
      tabIndex={isQuestion && 0}
      title={isQuestion && !isDialog ? "자세히 보기" : ""}
      {...restProps}
    >
      {title && (
        <>
          {tags && (
            <TagList hasButton={hasButton}>
              {tags.map((tag, idx) => (
                <li key={idx}>
                  <Hashtag type={tag} />
                </li>
              ))}
            </TagList>
          )}
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
    }
    &:nth-child(2) {
      right: 2em;
    }
  }
`;

CardBox.Content = styled.div`
  margin: 0 auto;
`;

/* -------------------------------- proptypes ------------------------------- */

Card.propTypes = {
  isQuestion: bool,
  isDialog: bool,
  tags: array,
  title: string,
  hasButton: bool,
  children: node,
};
