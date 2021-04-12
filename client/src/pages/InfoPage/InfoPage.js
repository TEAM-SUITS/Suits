import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import { UserPage } from 'pages/Pages';

/* -------------------------------------------------------------------------- */

export default function InfoPage() {
  return (
    <>
    <TextHeaderBar />
    <PageContainer variants={pageEffect} initial="hidden" animate="visible">
    </PageContainer>
    </>
);
}
