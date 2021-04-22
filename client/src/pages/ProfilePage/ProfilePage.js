import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import { useSelector } from "react-redux";
import Profile from "components/Profile/Profile";
import axios from "axios";
import QnAContent from "components/Content/QnAContent";
import Card from "components/Card/Card";

/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const { authUser } = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, isLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      isLoading(true);
      const { data } = await axios("/api/user-profile");
      setUserProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    return () => {
      isLoading(false);
    };
  }, []);

  const renderAnsweredQuestions = () => {
    if (loading) {
      return "loading...";
    } else if (userProfile && userProfile[0].answeredQuestions.length === 0) {
      return "작성한 답변이 없어요";
    } else if (userProfile && userProfile[0].answeredQuestions) {
      return userProfile[0].answeredQuestions.map((data) => (
        <Card
          key={data._id}
          isQuestion={true}
          title={data.content}
          tags={data.hashTag}
        >
          <QnAContent
            answer={data.answers.find(
              (answer) => answer.postedby?._id === authUser._id
            )}
          />
        </Card>
      ));
    }
  };

  const {
    username,
    avatar,
    likeCount,
    bio,
    tier,
    githubRepo,
    hashTag,
  } = authUser;

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
        <Profile user={user} />
        {renderAnsweredQuestions()}
      </PageContainer>
    </>
  );
}
