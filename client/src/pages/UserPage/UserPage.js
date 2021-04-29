import React from 'react';
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import { pageEffect } from 'styles/motions/variants';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';

/* -------------------------------------------------------------------------- */

export default function UserPage() {
  return (
    <>
      <TextHeaderBar />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible"></PageContainer>
    </>
  );
}
