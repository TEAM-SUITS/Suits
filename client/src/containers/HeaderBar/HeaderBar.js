import React from 'react';
import styled from 'styled-components';
import useDetectViewport from 'hooks/useDetectViewport';
import { node } from 'prop-types';
import { museoLarge } from 'styles/common/common.styled';

/* ---------------------------- styled components --------------------------- */
const MobileContainer = styled.header`
  position: fixed;
  top: 0;
  background-color: var(--color-white);
  text-align: center;
  min-width: 375px;
  height: 45px;
  margin: 0;
`;

const DesktopContainer = styled.header`
  position: fixed;
  top: 0;
  background-color: var(--color-white);
  max-width: 944px;
  width: 100%;
  height: 45px;
  margin: 0;
  `;

const StyledHeading = styled.h1`
  height: 45px;
  line-height: 45px;
  cursor: default;
  user-select: none;
  display: block;
  margin: 0;
  font-weight: 700;

  span {
    ${museoLarge}
    margin-right: 2em;
  }
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

HeaderBar.propTypes = {
  children: node.isRequired,
};