import React from 'react';
import LikeButton from 'components/LikeButton/LikeButton';
import MiniProfile from 'components/MiniProfile/MiniProfile';
import styled from 'styled-components';
import { a11yHidden, ellipsis, museoSmall } from 'styles/common/common.styled';
import { object } from 'prop-types';
import { bool } from 'prop-types';

/* ---------------------------- styled component ---------------------------- */

const QnAContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const AnswerInfo = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
`;

const AnswerDetail = styled.p`
  max-width: 347px;
  margin: 1em;
  ${museoSmall}
  ${(props) => props.isEllipsis && ellipsis}
`;

const ScreenReaderSpan = styled.span`
  ${a11yHidden}
`;

/* -------------------------------- mockdata -------------------------------- */
const mockdata = {
  _id: "607d40dfc0fe755dc815f9c2",
  username: "ahnanne",
  avatar: "https://avatars.githubusercontent.com/u/54733637?v=4",
  bio: "저는 천사예인입니다.",
  githubRepo: "https://github.com/ahnanne",
  tier: 6,
};

/* -------------------------------------------------------------------------- */

export default function QnAContent({ answer, isEllipsis = true }) {
  // answer.author, answer.liked, answer.content
  return (
    <QnAContainer>
      <AnswerInfo>
        <MiniProfile user={answer.postedby || mockdata} />
        <LikeButton />
        <ScreenReaderSpan>{answer.likes.length}</ScreenReaderSpan>
      </AnswerInfo>
      <AnswerDetail isEllipsis={isEllipsis}>{answer.content}</AnswerDetail>
    </QnAContainer>
  );
}

/* -------------------------------- propTypes ------------------------------- */

QnAContent.propTypes = {
  answer: object.isRequired,
  isEllipsis: bool,
};
