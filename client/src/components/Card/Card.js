import React from 'react';
import { bool, string, node, array } from 'prop-types';
import styled from 'styled-components';
import { boxShadow, resetList, textShadow } from 'styles/common/common.styled';
import Icon from 'components/Icon/Icon';
import Divider from 'components/Divider/Divider';
import Hashtag from 'components/Hashtag/Hashtag';

/* ---------------------------- styled components ---------------------------- */

const CardBox = styled.div`
  ${boxShadow}
  cursor: ${(props) =>
    props.isQuestion && !props.isDialog ? 'pointer' : 'initial'};
  position: relative;
  min-width: 305px;
  border-radius: 10px;
  background-color: var(--color-gray1);
  padding: 1em 2em 1.4em;
  max-height: 60vh;
  overflow: auto;
  color: var(--color-gray5);
  max-width: 688px;
  width: 100%;
`;

const TagList = styled.ul`
  ${resetList};
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 1em;
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
  ...restProps
}) {
  return (
    <CardBox
      isQuestion={isQuestion}
      isDialog={isDialog}
      onClick={onClick}
      role={isQuestion && !isDialog ? 'button' : ''}
      aria-label={isQuestion && !isDialog ? '자세히 보기' : ''}
      title={isQuestion && !isDialog ? '자세히 보기' : ''}
      {...restProps}
    >
      {title && (
        <>
          {tags && (
            <TagList>
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
  children: node,
};
