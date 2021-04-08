import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import SearchHeaderBar from 'containers/SearchHeaderBar/SearchHeaderBar';

/* -------------------------------------------------------------------------- */

export default function SearchPage() {
  return (
    <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      <SearchHeaderBar isSearching={true} />
    </PageContainer>
  );
}
