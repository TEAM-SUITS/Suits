import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <PageContainer variants={pageEffect} initial="hidden" animate="visible">
    </PageContainer>
  );
}
