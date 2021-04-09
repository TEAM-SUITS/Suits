import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { resetBoxModel } from "styles/common/common.styled";

const Link = ({ children, to, ...restProps }) => {
  return (
    <li>
      <NavLink to={to} {...restProps}>
        {children}
      </NavLink>
    </li>
  );
};

/* ---------------------------- styled components --------------------------- */
const ParentContainer = styled.div`
  ${({ ismobile }) =>
    !ismobile &&
    css`
      display: block;
      position: fixed;
      top: 0;
      width: 100%;
      max-width: 944px;
      margin: 0 auto;
    `}
  ${({ ismobile }) =>
  !ismobile &&
  css`
    display: hidden;
  `}
`;

const StyledNav = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

  // desktop
  ${({ ismobile }) =>
    !ismobile &&
    css`
      position: absolute;
      top: 0;
      right: 0;
      width: 315px;
      padding: 25px 15px;
      justify-content: space-around;
      height: 45px;
      border-top: 1px solid var(--color-gray);
      margin: 0;
      background-color: transparent;
    `}

  // mobile
  ${({ ismobile }) =>
    ismobile &&
    css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100vw;
      min-width: 375px;
      flex: 1;
      padding: 25px 15px;
      justify-content: space-around;
      height: 45px;
      border-top: 1px solid var(--color-gray);
      margin: 0;
      background-color: #fff;
    `}
`;

/* -------------------------------------------------------------------------- */
export default function Navbar({ ismobile, children }) {
  return (
    <ParentContainer ismobile={ismobile}>
      <StyledNav ismobile={ismobile}>{children}</StyledNav>
    </ParentContainer>
  );
}

Navbar.ItemLink = styled(Link)`
  ${resetBoxModel}
  padding: 10px 15px;
`;
