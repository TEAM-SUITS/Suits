import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import { boxShadow } from 'styles/common/common.styled';

/* ---------------------------- styled components --------------------------- */
const Container = styled.header`
  z-index: 10;
  @media screen and (min-width: 480px) {
    // desktop

    position: fixed;
    top: 0;
    background-color: var(--color-body);
    max-width: 944px;
    width: 100%;
    height: 45px;
    margin: 0;

    span {
      margin-left: 2em;
    }
  }

  @media screen and (max-width: 479px) {
    // mobile
    position: fixed;
    top: 0;
    background-color: var(--color-body);
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
  ${boxShadow}

  span {
    display: inline-block;
    padding-top: 0.1em;
    height: 100%;
  }

  a {
    color: var(--color-text);
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
