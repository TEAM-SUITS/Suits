import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import React from "react";
import styled from "styled-components";
import { a11yHidden, ellipsis, museoSmall } from "styles/common/common.styled";

const QnAContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const AnswerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerDetail = styled.p`
  margin: 0;
  ${museoSmall}
  ${ellipsis}
`;

const ScreenReaderSpan = styled.span`
  ${a11yHidden}
`;

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
