import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';

/* -------------------------------------------------------------------------- */

export default function InfoPage() {
  return (
    <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      <TextHeaderBar />
    </PageContainer>
  );
}
