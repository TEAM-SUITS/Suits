import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";

/* -------------------------------------------------------------------------- */
export default function HomePage() {
  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      ></PageContainer>
    </>
  );
}
