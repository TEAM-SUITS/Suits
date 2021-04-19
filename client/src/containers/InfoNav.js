import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { resetList, spoqaMediumLight } from 'styles/common/common.styled';
import { useLocation } from 'react-router';

const StyledNav = styled.ul`
  ${resetList}
  position: fixed;
  top: 45px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledNavLink = styled(NavLink)`
  ${spoqaMediumLight}
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  border-bottom: ${(props) =>
    props.active ? '2px solid var(--color-gray3)' : null};
  font-weight: ${(props) => (props.active ? 700 : 400)};
`;

export default function InfoNav() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <StyledNav>
      <StyledNavLink
        to={'/info/suits'}
        active={pathname === '/info/suits' || pathname === '/info'}
      >
        Suits
      </StyledNavLink>
      <StyledNavLink to={'/info/my-info'} active={pathname === '/info/my-info'}>
        나의 정보
      </StyledNavLink>
      <StyledNavLink
        to={'/info/how-to-use'}
        active={pathname === '/info/how-to-use'}
      >
        이용 안내
      </StyledNavLink>
    </StyledNav>
  );
}
