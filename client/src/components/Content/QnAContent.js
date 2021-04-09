import LikeButton from "components/LikeButton/LikeButton";
import MiniProfile from "components/MiniProfile/MiniProfile";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function QnAContent() {
  return (
    <article>
      <Container>
        <MiniProfile
          user={{
            id: "12312312",
            img: "https://avatars.githubusercontent.com/u/40879385?v=4",
            tier: 3,
            username: "minki607",
          }}
        />
        <LikeButton />
        <span>42</span>
      </Container>
    </article>
  );
}
