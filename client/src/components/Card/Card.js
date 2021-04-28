import React from 'react';
import { bool, string, node, array } from 'prop-types';
import styled, { css } from 'styled-components';
import { boxShadow, resetList, textShadow } from 'styles/common/common.styled';
import Icon from 'components/Icon/Icon';
import Divider from 'components/Divider/Divider';
import { DividerContainer } from 'containers/DividerContainer/DividerContainer.styled';
import Hashtag from 'components/Hashtag/Hashtag';
import { Link } from 'react-router-dom';

/* ---------------------------- styled components ---------------------------- */

const CardBox = styled.div`
  ${boxShadow}
  cursor: ${(props) => (props.isButton && !props.isDialog ? 'pointer' : 'initial')};
  position: relative;
  min-width: 305px;
  border-radius: 10px;
  background-color: var(--color-body);
  padding: 1em 2em 1.4em;
  /* max-height: 60vh; */
  overflow: auto;
  color: var(--color-gray5);
  max-width: 688px;
  width: 100%;
  margin: ${({ centerAlign }) => centerAlign && '0 auto'};

  a {
    font-size: 1.6rem;
  }
`;

const TagList = styled.ul`
  ${resetList};
  display: flex;
  justify-content: center;
  max-width: 300px;
  margin: 1em auto;

  && li {
    margin: 0 5px;
  }

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
  qId,
  isQuestion,
  isPreview,
  isDialog,
  isButton,
  title,
  tags,
  onClick,
  children,
  hasButton,
  centerAlign,
  noDivider,
  ...restProps
}) {
  const handleKeyDown = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      onClick && onClick();
    }
  };

  return (
    <CardBox
      isButton={isButton}
      isQuestion={isQuestion}
      isDialog={isDialog}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isButton && !isDialog ? 'button' : ''}
      aria-label={isButton && !isDialog ? '자세히 보기' : ''}
      tabIndex={isButton && 0}
      title={isButton && !isDialog ? '자세히 보기' : ''}
      centerAlign={centerAlign}
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
            <h2>{isPreview ? <Link to={`/post/${qId}`}>{title}</Link> : <>{title}</>}</h2>
          </CardBox.Header>
          {noDivider ? null : (
            <DividerContainer>
              <Divider primary width="80%" height="2px" />
            </DividerContainer>
          )}
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
    color: var(--color-gray5);
    ${textShadow}
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
