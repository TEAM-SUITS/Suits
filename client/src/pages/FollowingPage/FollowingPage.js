import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Hashtag from "components/Hashtag/Hashtag";

/* -------------------------------------------------------------------------- */

export default function FollowingPage() {
  return (
    <>
      <TextHeaderBar page="liked" />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <Hashtag
          type='All'
          isSelected={false}
        />
      </PageContainer>
    </>
  );
}
