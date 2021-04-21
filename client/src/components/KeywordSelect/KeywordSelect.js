import Hashtag from 'components/Hashtag/Hashtag';
import { array, func } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { resetList, spoqaLarge } from 'styles/common/common.styled';

const Container = styled.div`
  button {
    background-color: transparent;
    border: none;
    ${spoqaLarge}
    position: absolute;
    top: 1.5em;
    z-index: 999;
    cursor: pointer;
    @media screen and (min-width: 480px) {
      font-size: 2.5rem;
    }
  }
`;
const Backdrop = styled.div.attrs(() => ({
  className: 'dim',
  role: 'presentation',
}))`
  max-width: 100%;
  z-index: 998;
  background-color: var(--color-black);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: ${(props) => props.opacity};
`;

const DialogContainer = styled.div.attrs((props) => ({
  role: 'dialog',
  ariaModal: 'true',
  ariaLable: props.label,
}))`
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledList = styled.ul`
  ${resetList};
  display: flex;
  flex-flow: column nowrap;
  height: 60vh;
  justify-content: space-around;
  li {
    div {
      font-size: 1.8rem;
      @media screen and (min-width: 480px) {
        font-size: 3rem;
      }
    }
  }
`;

const CancelButton = styled.button`
  color: var(--color-gray2);
  left: 1.5em;
`;

const DoneButton = styled.button`
  color: var(--color-white);
  right: 1.5em;
`;

/* ---------------------------- styled component ---------------------------- */

export default function KeywordSelect({ userKeywords, onDone, onCancel }) {
  const [selectedKeywords, setSelectedKeywords] = useState(
    userKeywords.length ? userKeywords : []
  );
  const keywordArray = [
    'CSS',
    'JavaScript',
    'OS',
    'Database',
    'Network',
    'Front-End',
    'Back-End',
  ];

  const handleClick = (keyword) => {
    const isSelected = selectedKeywords.indexOf(keyword) > -1;

    if (isSelected) {
      // remove keyword
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    } else {
      // add keyword
      if (selectedKeywords.length >= 3) return;
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const submitSelectedKeywords = () => {
    onDone(selectedKeywords);
  };

  const cancelKeywordSelect = () => {
    setSelectedKeywords(userKeywords.length ? userKeywords : []);
    onCancel();
  };

  return (
    <Container>
      <CancelButton onClick={cancelKeywordSelect}>Cancel</CancelButton>
      <Backdrop opacity={0.8} />
      <DialogContainer>
        <StyledList>
          {keywordArray.map((keyword) => {
            return (
              <li key={keyword}>
                <Hashtag
                  type={keyword}
                  isSelected={selectedKeywords.indexOf(keyword) > -1}
                  isButton={true}
                  clicked={() => {
                    handleClick(keyword);
                  }}
                />
              </li>
            );
          })}
        </StyledList>
      </DialogContainer>
      <DoneButton onClick={submitSelectedKeywords}>done</DoneButton>
    </Container>
  );
}

/* ------------------------------- prop types ------------------------------- */

KeywordSelect.propTypes = {
  userKeywords: array,
  onDone: func,
  onCancel: func,
};
