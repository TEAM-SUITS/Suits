import React from 'react';
import styled from 'styled-components';
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import { pageEffect } from 'styles/motions/variants';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import { spoqaMedium, spoqaLarge } from 'styles/common/common.styled';

/* -------------------------------------------------------------------------- */
const StyledSection = styled.section`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 400px;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: nowrap;

  > p {
    /* flex-basis: 200px; */
    display: block;
    ${spoqaLarge}
    flex: 0 1 auto;
    align-self: flex-end;
  }

  > img {
    width: 350px;
    height: 350px;
    align-self: flex-end;
  }

  @media screen and (max-width: 480px) {
    flex-flow: column;
    align-items: center;

    > img {
      margin: 0 auto;
      align-self: center;
    }

    p {
      ${spoqaMedium}
      text-align: center;
      align-self: center;
    }
  }
`;

export default function PageNotFound() {
  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <StyledSection>
          <img src="/assets/404.png" alt="page not found" />
          <p>이런... 찾으시는 페이지가 없습니다.</p>
        </StyledSection>
      </PageContainer>
    </>
  );
}
