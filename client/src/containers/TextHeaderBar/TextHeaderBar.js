import HeaderBar from '../HeaderBar/HeaderBar';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import styled from 'styled-components';
import { museoLarge, museoMedium } from 'styles/common/common.styled';

/* ---------------------------- styled components --------------------------- */
const BoldSpan = styled.span`
  ${museoLarge}
  font-weight: 700;
`;

const LightSpan = styled.span`
  ${museoMedium}
  font-weight: 400;
  line-height: 45px;
`;

/* -------------------------------------------------------------------------- */
export default function TextHeaderBar({ page }) {
  switch (page) {
    case 'home':
      return (
        <HeaderBar>
          <Link to="/">
            <BoldSpan>SUITS</BoldSpan>
          </Link>
        </HeaderBar>
      );

    case 'liked':
      return (
        <HeaderBar>
          <LightSpan>Following</LightSpan>
        </HeaderBar>
      );

    case 'profile':
      return (
        <HeaderBar>
          <LightSpan>Profile</LightSpan>
        </HeaderBar>
      );

    case 'search':
      return (
        <HeaderBar>
          <LightSpan>Search</LightSpan>
        </HeaderBar>
      );

    default:
      return (
        <HeaderBar>
          <Link to="/">
          <BoldSpan>SUITS</BoldSpan>
          </Link>
        </HeaderBar>
      );
  }
}

/* -------------------------------------------------------------------------- */

TextHeaderBar.propTypes = {
  page: string,
};
