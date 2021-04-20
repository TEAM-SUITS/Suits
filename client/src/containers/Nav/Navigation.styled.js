import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { resetBoxModel } from "styles/common/common.styled";
import { bool, node } from "prop-types";

/* --------------------------------- router --------------------------------- */
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
  z-index: 20;
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
  padding: 25px 15px;
  height: 45px;
  margin: 0;

  // desktop
  ${({ ismobile }) =>
    !ismobile &&
    css`
      position: absolute;
      top: 0;
      right: 0;
      width: 315px;
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
      justify-content: space-around;
      border-top: 1px solid var(--color-gray1);
      background-color: var(--color-white);
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

/* -------------------------------- proptypes ------------------------------- */
Navbar.propTypes = {
  ismobile: bool,
  children: node,
};
