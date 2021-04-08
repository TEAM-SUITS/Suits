import React from 'react';
import styled from 'styled-components';
import { museoLarge } from 'styles/common/common.styled';
import useDetectViewport from 'hooks/useDetectViewport';

/* ---------------------------- styled components --------------------------- */
const MobileContainer = styled.div`
  background-color: pink;
  min-width: 375px;
  height: 45px;
  text-align: center;
`;

const DesktopContainer = styled.div`
  background-color: skyblue;
  width: 100%;
  min-width: 375px;
  height: 45px;
  `;

const StyledHeading = styled.h1`
  height: 45px;
  line-height: 45px;
  cursor: default;
  user-select: none;
  display: block;
  margin: 0;
  font-weight: 700;
`;

/* -------------------------------------------------------------------------- */
export default function HeaderBar({ children }) {

  const { isMobile } = useDetectViewport();

  if (isMobile) {
    return (
      <MobileContainer>
        <StyledHeading>{children}</StyledHeading>
      </MobileContainer>
    );
  }

  return (
    <DesktopContainer>
      <StyledHeading>{children}</StyledHeading>
    </DesktopContainer>
  );
}
