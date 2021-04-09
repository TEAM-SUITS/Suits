import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";

import Dialog from 'components/Dialog/Dialog';

/* -------------------------------------------------------------------------- */
export default function HomePage() {
  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      </PageContainer>
    </>
  );
}
