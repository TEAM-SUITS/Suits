import React from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import { SearchHeaderBar } from 'containers/HeaderBar/CustomHeaderBar';

/* -------------------------------------------------------------------------- */

export default function SearchPage() {
  return (
    <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      <SearchHeaderBar isSearching={false} />
    </PageContainer>
  );
}
