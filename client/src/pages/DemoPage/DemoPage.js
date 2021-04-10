import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";

/* -------------------------------------------------------------------------- */
export default function DemoPage() {
  return (
    <>
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <a href="/auth/github">Sign In With Github</a>
      </PageContainer>
    </>
  );
}
