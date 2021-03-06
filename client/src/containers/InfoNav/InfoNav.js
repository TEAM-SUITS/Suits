import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { resetList, resetBoxModel, spoqaMediumLight } from 'styles/common/common.styled';

/* -------------------------------------------------------------------------- */

const StyledNav = styled.ul`
  ${resetList}
  position: fixed;
  top: 45px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-body);
  z-index: 5;
`;

const StyledNavLink = styled(NavLink)`
  ${spoqaMediumLight}
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  border-bottom: ${(props) => (props.active ? '2px solid var(--color-gray5)' : null)};
  font-weight: ${(props) => (props.active ? 700 : 400)};
`;

const StyledHeading = styled.h2`
  ${resetBoxModel}
  font-size: 1.8rem;

  @media screen and (min-width: 480px) {
    font-size: 2rem;
  }
`;

/* ---------------------------- styled components --------------------------- */

export default function InfoNav() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <StyledNav>
      <StyledNavLink to={'/info/suits'} active={pathname === '/info/suits' || pathname === '/info' ? 1 : 0}>
        <StyledHeading>Suits</StyledHeading>
      </StyledNavLink>
      <StyledNavLink to={'/info/my-info'} active={pathname === '/info/my-info' ? 1 : 0}>
        <StyledHeading>계정 관리</StyledHeading>
      </StyledNavLink>
      <StyledNavLink to={'/info/how-to-use'} active={pathname === '/info/how-to-use' ? 1 : 0}>
        <StyledHeading>이용 안내</StyledHeading>
      </StyledNavLink>
    </StyledNav>
  );
}
