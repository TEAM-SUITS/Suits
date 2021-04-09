import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Navigation from "containers/Nav/Navigation";

import SearchHeaderBar from 'containers/SearchHeaderBar/SearchHeaderBar';

/* -------------------------------------------------------------------------- */

export default function SearchPage() {
  return (
    <>
      <TextHeaderBar page="search" />
      <Navigation />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      </PageContainer>
    </>
  );
}
