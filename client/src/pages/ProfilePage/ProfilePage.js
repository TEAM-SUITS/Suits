import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import { useSelector } from "react-redux";
import Profile from "components/Profile/Profile";
import { Avatar } from "@material-ui/core";

/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const { authUser } = useSelector((state) => state.auth);
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
      </PageContainer>
    </>
  );
}
