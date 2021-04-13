import Hashtag from 'components/Hashtag/Hashtag';
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
      font-size: 1.8em;
      width: auto;
    }
  }
`;

const SkipButton = styled.button`
  color: var(--color-gray2);
  left: 1.5em;
`;

const DoneButton = styled.button`
  color: var(--color-white);
  right: 1.5em;
`;

export default function KeywordSelect({ keywordArray, userKeywords }) {
  const [selectedKeywords, setSelectedKeywords] = useState(
    userKeywords.length ? userKeywords : []
  );

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
    console.log('user.keyword를 selectedKeyword로 교체합니다.');
  };

  const skipKeywordSelect = () => {
    setSelectedKeywords([]);
    console.log('관심 키워드 선택을 스킵하고 창을 닫습니다.');
  };

  if (userKeywords.length) {
    return (
      <Container>
        <SkipButton onClick={skipKeywordSelect}>Cancel</SkipButton>
        <Backdrop opacity={0.8} />
        <DialogContainer>
          <StyledList>
            {keywordArray.map((keyword) => {
              return (
                <li key={keyword.type}>
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
  } else {
    return (
      <Container>
        <SkipButton onClick={skipKeywordSelect}>Skip</SkipButton>
        <Backdrop opacity={1} />
        <DialogContainer>
          <StyledList>
            {keywordArray.map((keyword) => {
              return (
                <li key={keyword.type}>
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

        <DoneButton onClick={submitSelectedKeywords}>Done</DoneButton>
      </Container>
    );
  }
}
