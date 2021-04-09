import React from 'react';
import styled from 'styled-components';
import useDetectViewport from 'hooks/useDetectViewport';
import { node } from 'prop-types';
import { boxShadowBlack } from 'styles/common/common.styled';

/* ---------------------------- styled components --------------------------- */
const MobileContainer = styled.header`
  position: fixed;
  top: 0;
  background-color: var(--color-white);
  text-align: center;
  width: 100%;
  min-width: 375px;
  height: 45px;
  margin: 0;

  span {
    display: inline-block;
    height: 100%;
  }
`;

const DesktopContainer = styled.header`
  position: fixed;
  top: 0;
  background-color: var(--color-white);
  max-width: 944px;
  width: 100%;
  height: 45px;
  margin: 0;

  span {
    margin-left: 2em;
  }
`;

const StyledHeading = styled.h1`
  height: 45px;
  line-height: 45px;
  cursor: default;
  user-select: none;
  display: block;
  margin: 0;
  ${boxShadowBlack}

  span {
    display: inline-block;
    padding-top: .1em;
    height: 100%;
  }

  .light {
    padding-top: .4em;
  }

  a {
    color: var(--color-black);
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