import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import { useSelector } from "react-redux";
import Profile from "components/Profile/Profile";
import Alert from "components/Alert/Alert";
import { ReactComponent as Spinner } from "components/Spinner/Spinner.svg";
import QNACardSection from "components/QNACardSection/QNACardSection";
import { fetchCurrentUserData } from "redux/storage/currentUser/currentUser";
import { useDispatch } from "react-redux";

/* ---------------------------- styled component ---------------------------- */

const SpinnerContainer = styled.div`
  width: 100%;
`;

const ProfileContainer = styled.div`
  align-self: baseline;

  @media screen and (min-width: 640px) {
    margin-top: 3em;
    position: sticky;
    top: 4.5rem;
  }
`;

const MessageContainer = styled.div`
  align-self: flex-start;
  margin: 3rem;
  width: 100%;
`;

/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const { currentUserData, isLoading } = useSelector(
    (state) => state.currentUser
  );

  const dispatch = useDispatch();
  const renderAnsweredQuestions = () => {
    if (isLoading) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    } else if (
      currentUserData &&
      currentUserData[0].answeredQuestions.length === 0
    ) {
      return (
        <MessageContainer>
          <Alert status="info" message="작성한 답변이 없어요" />
        </MessageContainer>
      );
    } else if (currentUserData && currentUserData[0].answeredQuestions) {
      return (
        <QNACardSection
          content="answeredQ"
          isLoading={isLoading}
          cardData={currentUserData[0]}
          refreshData={() => dispatch(fetchCurrentUserData)}
        />
      );
    }
  };

  const { _id, username, avatar, likeCount, bio, tier, githubRepo, hashTag } =
    currentUserData && currentUserData[0] ? currentUserData[0] : {};

  // 프로필 컴포넌트에 맞는 형식으로 전달하기 위해 이름 재지정
  const user = {
    _id,
    username,
    img: avatar,
    like: likeCount,
    bio,
    tier,
    hashtag: hashTag,
    github: githubRepo,
  };
  return (
    <>
      <TextHeaderBar page="profile" />
      <PageContainer
        page="profile"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        <ProfileContainer>
          <Profile user={user} $isLoading={isLoading} className="profile" />
        </ProfileContainer>
        {renderAnsweredQuestions()}
      </PageContainer>
    </>
  );
}
