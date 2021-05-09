import styled from 'styled-components';
import Icon from 'components/Icon/Icon';
import { func } from 'prop-types';

/* ---------------------------- styled components --------------------------- */
const PositionContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 90px;
  z-index: 1000;

  // 데스크탑
  @media screen and (min-width: 480px) {
    right: 5%;
  }
`;

const TopButton = styled.button.attrs(() => ({
  type: 'button',
  title: '맨 위로 가기',
  'aria-label': '맨 위로 가기'
}))`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;

  // 아이콘 스타일링
  svg {
    opacity: .7;
    filter: drop-shadow(2px 2px 10px var(--color-gray2));

    rect {
      fill: var(--color-body);
    }

    line {
      fill: none;
      stroke: var(--color-text);
      opacity: 1;
    }
  }
`;

/* ------------------------------ scroll to top ----------------------------- */
export default function ScrollToTop({ handleClick }) {
  return (
    <PositionContainer>
      <TopButton onClick={handleClick}>
        <Icon type="arrow" height="40px" />
      </TopButton>
    </PositionContainer>
  );
}

/* ------------------------------- prop types ------------------------------- */

ScrollToTop.propTypes = {
  handleClick: func,
};
