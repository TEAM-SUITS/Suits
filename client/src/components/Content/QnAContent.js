import React from "react";
import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import styled from "styled-components";
import { ellipsis, spoqaMedium } from "styles/common/common.styled";
import { object, bool, oneOfType } from "prop-types";
import API from "api/api";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProfileDialog from "containers/ProfileDialog/ProfileDialog";
import { setError } from "redux/storage/error/error";
import axios from "axios";

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
  ${(props) => props.isEllipsis && ellipsis}
  ${spoqaMedium}
`;

const NoAnswerYet = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  align-items: center;

  ${spoqaMedium}

  > img {
    width: 80px;
    height: auto;
  }
  p {
    font-size: 1.4rem;
    margin-bottom: 1em;
  }
`;

/* -------------------------------- mockdata -------------------------------- */
const mockdata = {
  _id: "607d40dfc0fe755dc815f9c2",
  username: "N/A",
  avatar: "/assets/suity.png",
  bio: "해당 유저는 탈퇴한 유저입니다.",
  githubRepo: "https://github.com/TEAM-SUITS/Suits",
  hashtag: [],
  tier: 1,
};
/* -------------------------------------------------------------------------- */

export default function QnAContent({ answer, isEllipsis = true }) {
  const { currentUserData } = useSelector((state) => state.currentUser);
  // 전체 refresh를 하지 않고 각각의 포스트만 refresh 하기 위해 따로 상태 관리
  const [$answer, setAnswer] = useState(answer);
  const [isLikeLoading, setLikeLoading] = useState(false);
  const [isDialogVisible, setDialogVisiblity] = useState(false);
  const [isProfileLoading, setProfileLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();

  const toggleLike = async (e) => {
    e.stopPropagation();
    try {
      setLikeLoading(true);
      // 만약 답변에 이미 좋아요를 표시한 유저라면 좋아요를 해제 하는 요청
      if ($answer.likes.includes(currentUserData[0]._id)) {
        const res = await axios.put(`/api/unlike/${answer._id}`);
        if (res.statusText === "OK") setAnswer(res.data);
      } else {
        const res = await axios.put(`/api/like/${answer._id}`);
        if (res.statusText === "OK") setAnswer(res.data);
      }
    } catch (err) {
      dispatch(setError("좋아요/해제시 오류가 발생하였습니다"));
    } finally {
      setLikeLoading(false);
    }
  };

  if (answer === false || !answer) {
    return (
      <QnAContainer>
        <NoAnswerYet>
          <img src="/assets/banner.png" alt="답변 없음을 알리는 슈티" />
          <p>아직 등록된 답변이 없습니다.</p>
        </NoAnswerYet>
      </QnAContainer>
    );
  }

  const handleDialog = async (id) => {
    setDialogVisiblity(true);
    try {
      setProfileLoading(true);
      const res = await axios(`/api/user-profile/${id}`);
      if (res.statusText === "OK") {
        const {
          _id,
          username,
          avatar,
          tier,
          hashTag,
          githubRepo,
          bio,
          likeCount,
        } = res.data[0];
        setProfile({
          _id,
          username,
          img: avatar,
          tier,
          hashtag: hashTag,
          github: githubRepo,
          bio,
          like: likeCount,
        });
      } else {
        dispatch(setError("서버에서 유저 정보를 불러오는데 실패하였습니다"));
        setProfile(mockdata);
      }
    } catch (err) {
      dispatch(setError("유저 정보를 불러오는데 실패하였습니다"));
      setProfile(mockdata);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") handleDialog($answer.postedby._id);
  };

  return (
    <QnAContainer>
      <AnswerInfo>
        <MiniProfile
          user={$answer.postedby || mockdata}
          isButton
          onClick={() => handleDialog($answer.postedby._id)}
          onKeyDown={handleKeyDown}
        />
        <LikeButton
          isLiked={$answer.likes.includes(currentUserData[0]._id)}
          disabled={$answer.postedby?._id === currentUserData[0]?._id}
          isLoading={isLikeLoading}
          onClick={toggleLike}
        />
        {$answer.likes.length}
      </AnswerInfo>
      <AnswerDetail isEllipsis={isEllipsis}>{$answer.content}</AnswerDetail>
      <ProfileDialog
        isVisible={isDialogVisible}
        user={profile}
        $isLoading={isProfileLoading}
        $onClick={() => {
          setDialogVisiblity(false);
          setProfile({});
        }}
      />
    </QnAContainer>
  );
}

/* -------------------------------- propTypes ------------------------------- */

QnAContent.propTypes = {
  answer: oneOfType([object, bool]),
  isEllipsis: bool,
};
