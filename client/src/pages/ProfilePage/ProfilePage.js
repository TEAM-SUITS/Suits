import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import { useSelector } from "react-redux";
import Profile from "components/Profile/Profile";
import QnAContent from "components/Content/QnAContent";
import Card from "components/Card/Card";
import Alert from "components/Alert/Alert";
import { ReactComponent as Spinner } from "components/Spinner/Spinner.svg";

/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const { currentUserData, isLoading } = useSelector(
    (state) => state.currentUser
  );

  const renderAnsweredQuestions = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (
      currentUserData &&
      currentUserData[0].answeredQuestions.length === 0
    ) {
      return <Alert status="info" message="작성한 답변이 없어요" />;
    } else if (currentUserData && currentUserData[0].answeredQuestions) {
      return currentUserData[0].answeredQuestions.map((data) => (
        <Card
          key={data._id}
          isQuestion={true}
          title={data.content}
          tags={data.hashTag}
        >
          <QnAContent
            answer={data.answers.find(
              (answer) => answer.postedby?._id === currentUserData[0]._id
            )}
          />
        </Card>
      ));
    }
  };

  const { username, avatar, likeCount, bio, tier, githubRepo, hashTag } =
    currentUserData && currentUserData[0] ? currentUserData[0] : {};

  // 프로필 컴포넌트에 맞는 형식으로 전달하기 위해 이름 재지정
  const user = {
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
        <Profile user={user} $isLoading={isLoading} />
        {renderAnsweredQuestions()}
      </PageContainer>
    </>
  );
}
