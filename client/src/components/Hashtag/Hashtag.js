import React from 'react';
import styled from 'styled-components';
import { bool, oneOf } from 'prop-types';
import { boxShadowBlack, spoqaSmallBold } from 'styles/common/common.styled';

const StyledHashtag = styled.button`
  ${boxShadowBlack}
  ${spoqaSmallBold}
  background-color: var(${(props) =>
    props.isSelected ? '--color-gray1' : props.theme});
  min-width: 5rem;
  padding: 3px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  cursor: default;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

/* ---------------------------- styled components --------------------------- */

export default function Hashtag({ type, isSelected = false }) {
  let theme = '';

  switch (type) {
    case 'CSS':
      theme = '--color-blue1';
      break;
    case 'JavaScript':
      theme = '--color-yellow';
      break;
    case 'Algorithm':
      theme = '--color-green1';
      break;
    case 'Database':
      theme = '--color-purple';
      break;
    case 'Network':
      theme = '--color-blue2';
      break;
    case 'Front-End':
      theme = '--color-green2';
      break;
    case 'Back-End':
      theme = '--color-orange';
      break;
    default:
      break;
  }
  return (
    <StyledHashtag isSelected={isSelected} theme={theme}>
      {type}
    </StyledHashtag>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Hashtag.propTypes = {
  type: oneOf([
    'CSS',
    'JavaScript',
    'Algorithm',
    'Database',
    'Network',
    'Front-End',
    'Back-End',
  ]),
  isSelected: bool,
};
