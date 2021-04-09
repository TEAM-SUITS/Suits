import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Navigation from "containers/Nav/Navigation";

/* -------------------------------------------------------------------------- */

export default function LikedPage() {
  return (
    <>
      <TextHeaderBar page="liked" />
      <Navigation />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      </PageContainer>
    </>
  );
}
