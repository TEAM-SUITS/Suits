import React from "react";
import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import styled from "styled-components";
import { ellipsis, spoqaSmall } from "styles/common/common.styled";
import { object, bool, oneOfType } from "prop-types";
import API from "api/api";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

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
  username: "N/A",
  avatar: "assets/suity.png",
  bio: "해당 유저는 탈퇴한 유저입니다.",
  githubRepo: "https://github.com/TEAM-SUITS/Suits",
  tier: 1,
};
/* -------------------------------------------------------------------------- */

export default function QnAContent({ answer, isEllipsis = true }) {
  const { currentUserData } = useSelector((state) => state.currentUser);
  // 전체 refresh를 하지 않고 각각의 포스트만 refresh 하기 위해 따로 상태 관리
  const [$answer, setAnswer] = useState(answer);
  const [isLikeLoading, setLikeLoading] = useState(false);

  const toggleLike = async (e) => {
    e.stopPropagation();
    try {
      setLikeLoading(true);
      // 만약 답변에 이미 좋아요를 표시한 유저라면 좋아요를 해제 하는 요청
      if ($answer.likes.includes(currentUserData[0]._id)) {
        const answerData = await API(`/api/unlike/${answer._id}`, "put");
        setAnswer(answerData);
      } else {
        const answerData = await API(`/api/like/${answer._id}`, "put");
        setAnswer(answerData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLikeLoading(false);
    }
  };

  if (answer === false || !answer) {
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
        <MiniProfile user={$answer.postedby || mockdata} />
        <LikeButton
          isLiked={$answer.likes.includes(currentUserData[0]._id)}
          // disabled={$answer.postedby?._id === currentUserData[0]._id}
          isLoading={isLikeLoading}
          onClick={toggleLike}
        />
        {$answer.likes.length}
      </AnswerInfo>
      <AnswerDetail isEllipsis={isEllipsis}>{$answer.content}</AnswerDetail>
    </QnAContainer>
  );
}

/* -------------------------------- propTypes ------------------------------- */

QnAContent.propTypes = {
  answer: oneOfType([object, bool]),
  isEllipsis: bool,
};
