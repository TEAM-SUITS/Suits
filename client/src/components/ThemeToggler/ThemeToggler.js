import Icon from 'components/Icon/Icon';
import React from 'react';
import styled from 'styled-components';
import { boxShadow } from 'styles/common/common.styled';

const StyledThemeToggler = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 50%;
  bottom: 10%;
  right: 5%;
  background-color: var(--color-body);
  color: var(--color-body);
  border: 1px solid var(--color-gray2);
  ${boxShadow}
  z-index: 1000;
  svg {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 680px) {
    padding: 2em;
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

export default function ThemeToggler({ handleClick }) {
  return (
    <StyledThemeToggler onClick={handleClick}>
      <Icon type="night" />
    </StyledThemeToggler>
  );
}
