import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import { boxShadowBlack } from 'styles/common/common.styled';

/* ---------------------------- styled components --------------------------- */
const Container = styled.header`
  @media screen and (min-width: 480px) { // desktop
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
  }

  @media screen and (max-width: 480px) { // mobile
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
  return (
    <Container>
      <StyledHeading>{children}</StyledHeading>
    </Container>
  );
}

HeaderBar.propTypes = {
  children: node.isRequired,
};