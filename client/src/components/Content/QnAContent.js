import React from "react";
import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import styled from "styled-components";
import { ellipsis, spoqaSmall } from "styles/common/common.styled";
import { object, bool, oneOfType } from "prop-types";

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
  ${(props) => props.isEllipsis && ellipsis}
  ${spoqaSmall}
`;

const NoAnswerYet = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  align-items: center;
  ${spoqaSmall}

  > img {
    width: 80px;
    height: auto;
  }
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

export default function QnAContent({ answer = {}, isEllipsis = true }) {
  if (answer === false || !answer.content) {
    return (
      <QnAContainer>
        <NoAnswerYet>
          <img src="assets/banner.png" alt="답변 없음을 알리는 슈티" />
          아직 등록된 답변이 없습니다.
        </NoAnswerYet>
      </QnAContainer>
    );
  }

  return (
    <QnAContainer>
      <AnswerInfo>
        <MiniProfile user={answer.postedby || mockdata} />
        <LikeButton />
        {answer.likes.length}
      </AnswerInfo>
      <AnswerDetail isEllipsis={isEllipsis}>{answer.content}</AnswerDetail>
    </QnAContainer>
  );
}

/* -------------------------------- propTypes ------------------------------- */

QnAContent.propTypes = {
  answer: oneOfType([object, bool]),
  isEllipsis: bool,
};
