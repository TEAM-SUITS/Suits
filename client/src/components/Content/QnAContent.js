import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import React from "react";
import styled from "styled-components";
import { a11yHidden, museoMedium } from "styles/common/common.styled";

const QnAContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const AnswerInfo = styled.div`
  display: flex;
  align-items: center;
  span {
    ${a11yHidden}
  }
`;

const AnswerDetail = styled.p`
  margin: 0;
  font-size: 16px;
`;

export default function QnAContent({ answer }) {
  return (
    <QnAContainer>
      <AnswerInfo>
        <MiniProfile user={answer.author} />
        <LikeButton />
        <span>좋아요 수</span>
        {answer.liked}
      </AnswerInfo>
      <AnswerDetail>{answer.content}</AnswerDetail>
    </QnAContainer>
  );
}
