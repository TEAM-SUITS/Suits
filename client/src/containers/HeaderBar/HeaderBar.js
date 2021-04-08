import React from 'react';
import styled from 'styled-components';
import { museoLarge } from 'styles/common/common.styled';
import useDetectViewport from 'hooks/useDetectViewport';

/* ---------------------------- styled components --------------------------- */
const HeadingContainer = styled.div`
  background-color: pink;
`;

const StyledHeading = styled.h1`
  cursor: default;
  user-select: none;
  ${museoLarge}
  display: block;
  font-weight: 700;
  margin: 0;
  text-align: center;
  padding: .3em 0;
`;

/* -------------------------------------------------------------------------- */
export default function HeaderBar() {

  const { isMobile } = useDetectViewport();

  if (isMobile) {
    return (
      <HeadingContainer>
        <StyledHeading>SUITS</StyledHeading>
      </HeadingContainer>
    );
  }

  return (
    <HeadingContainer>
      <StyledHeading>제대로 작동 중!?</StyledHeading>
    </HeadingContainer>
  );
}