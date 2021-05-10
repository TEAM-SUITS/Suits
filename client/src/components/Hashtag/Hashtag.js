import React from 'react';
import styled from 'styled-components';
import { bool, oneOf } from 'prop-types';
import { boxShadow, spoqaSmallBold } from 'styles/common/common.styled';
import getHashTagColor from 'utils/getHashTagColor/getHashTagColor';

/* ---------------------------- styled components --------------------------- */
const handleButtonTheme = (type, isSelected, theme) => {
  // 🌒 다크 모드일 때
  if (type === 'All') {
    return isSelected
      ? 'color: var(--color-black); background: var(--color-gray3)'
      : 'color: var(--color-body); background: var(--color-text)';
  }

  return isSelected
    ? 'color: var(--color-black); background: var(--color-gray3)'
    : `color: var(--color-black); background: var(${theme})`;
};
/**
 * 참고
 * https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components
 */

const StyledHashtag = styled.div`
  ${boxShadow}
  ${spoqaSmallBold}
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3em;
  min-width: 7.6rem;
  font-size: ${(props) => (props.isSelected ? 'inherit' : '1rem')};
  cursor: ${(props) => (props.isButton ? 'pointer' : 'initial')};
  ${({ $type, isSelected, theme }) => handleButtonTheme($type, isSelected, theme)}
`;

/* -------------------------------------------------------------------------- */
export default function Hashtag({ type, isSelected, isButton, children, clicked }) {
  return (
    <StyledHashtag
      $type={type}
      isButton={isButton}
      isSelected={isSelected}
      theme={getHashTagColor(type)}
      role={isButton && 'button'}
      aria-label={isButton ? type : ''}
      title={isButton ? type : ''}
      tabIndex={isButton ? 0 : -1}
      onClick={clicked}
      onKeyUp={(e) => e.code === 'Space' && clicked(e)}
    >
      {type !== 'ETC' ? type : children}
    </StyledHashtag>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Hashtag.propTypes = {
  type: oneOf(['CSS', 'JavaScript', 'OS', 'Database', 'Network', 'Front-End', 'Back-End', 'All', 'ETC']),
  isSelected: bool,
  isButton: bool,
};
