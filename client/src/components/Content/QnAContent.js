import React from "react";
import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import styled from "styled-components";
import { a11yHidden, ellipsis, museoSmall } from "styles/common/common.styled";
import { object } from "prop-types";

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
  margin: 1em;
  ${museoSmall}
  ${ellipsis}
`;

const ScreenReaderSpan = styled.span`
  ${a11yHidden}
`;

/* -------------------------------------------------------------------------- */

export default function QnAContent({ answer }) {
  return (
    <QnAContainer>
      <AnswerInfo>
        <MiniProfile user={answer.author} />
        <LikeButton />
        <ScreenReaderSpan>좋아요 수</ScreenReaderSpan>
        {answer.liked}
      </AnswerInfo>
      <AnswerDetail>{answer.content}</AnswerDetail>
    </QnAContainer>
  );
}

/* -------------------------------- propTypes ------------------------------- */

QnAContent.propTypes = {
  answer: object.isRequired,
};
