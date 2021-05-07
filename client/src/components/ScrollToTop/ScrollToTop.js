import styled from 'styled-components';
import Icon from 'components/Icon/Icon';
import { func } from 'prop-types';

const TopButton = styled.button`
  position: fixed;
  top: 80px;
  right: 5%;
  border: none;
  background-color: transparent;
  z-index: 1000;

  path {
    fill: var(--color-text);
    opacity: 30%;
  }
`;

export default function ScrollToTop({ handleClick }) {
  return (
    <TopButton>
      <Icon type="arrow" height="40px" />
    </TopButton>
  );
}

/* ------------------------------- prop types ------------------------------- */

ScrollToTop.propTypes = {
  handleClick: func,
};
