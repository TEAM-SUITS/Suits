import React from "react";
import styled, { css } from "styled-components";
import { bool, oneOf } from "prop-types";
import { boxShadowBlack, spoqaSmallBold } from "styles/common/common.styled";

/* ---------------------------- styled components --------------------------- */
const handleButtonTheme = (type, isSelected, theme) => {
  if (type === 'All') {
    return isSelected
      ? 'color: var(--color-gray3); background: var(--color-gray1)'
      : 'color: var(--color-white); background: var(--color-black)';
  }

  return isSelected
    ? 'color: var(--color-gray3); background: var(--color-gray1)'
    : `color: var(--color-black); background: var(${theme})`;
};
/**
 * 참고
 * https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components
 */

const StyledHashtag = styled.div`
  ${boxShadowBlack}
  ${spoqaSmallBold}
  padding: 0.3em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3em;
  min-width: 7.6rem;
  font-size: ${(props) => (props.isSelected ? 'inherit' : '1rem')};
  cursor: ${(props) =>
    props.isButton ? 'pointer' : 'initial'};
  ${({ $type, isSelected, theme }) => handleButtonTheme($type, isSelected, theme)}
`;

/* -------------------------------------------------------------------------- */
export default function Hashtag({ type, isSelected, isButton, clicked }) {
  let theme = "";

  switch (type) {
    case "All":
      theme = "--color-black";
      break;
    case "CSS":
      theme = "--color-blue1";
      break;
    case "JavaScript":
      theme = "--color-yellow";
      break;
    case "OS":
      theme = "--color-green1";
      break;
    case "Database":
      theme = "--color-purple";
      break;
    case "Network":
      theme = "--color-blue2";
      break;
    case "Front-End":
      theme = "--color-green2";
      break;
    case "Back-End":
      theme = "--color-orange";
      break;
    default:
      break;
  }
  return (
    <StyledHashtag
      $type={type}
      isButton={isButton}
      isSelected={isSelected}
      theme={theme}
      role={isButton && 'button'}
      aria-label={isButton ? type : ''}
      title={isButton ? type : ''}
      tabIndex={isButton ? 0 : -1}
      onClick={clicked}
      onKeyUp={(e) => e.code === "Space" && clicked()}
    >
      {type}
    </StyledHashtag>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Hashtag.propTypes = {
  type: oneOf([
    "CSS",
    "JavaScript",
    "OS",
    "Database",
    "Network",
    "Front-End",
    "Back-End",
    "All",
  ]),
  isSelected: bool,
  isButton: bool,
};
