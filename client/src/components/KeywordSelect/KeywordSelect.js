import Hashtag from 'components/Hashtag/Hashtag';
import { array, func } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { resetList, spoqaLarge } from 'styles/common/common.styled';
import Portal from "components/Portal/Portal";

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
  opacity: ${(props) => props.$opacity};
  backdrop-filter: blur(3px);
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

  const dialogRef = React.useRef(null);

  // a11y
  React.useEffect(() => {
      const dialogNode = dialogRef.current;
      dialogNode.setAttribute("tabIndex", -1);
      dialogNode.focus();

      // 다이얼로그 뒤에 영역이 모바일 보이스리더기에 읽히지 않도록 처리
      const rootNode = document.getElementById("root");
      rootNode.setAttribute("aria-hidden", true);
      rootNode.style.userSelect = "none";

      const handleFocusTrap = (e) => {
        // 다이얼로그 노드
        // const dialogNode = dialogRef.current;
        // focusable nodes "inside" dialogNode
        const focusableNodeList = dialogNode.querySelectorAll(
          "a, button, input, select, textarea"
        ); // 참고로 a 태그는 href 속성이나 tabindex 속성이 있으면 focusable함.

        // 첫 번째 포커스 요소와 마지막 포커스 요소를 기억해놓아야
        // 다이얼로그가 닫히지 않는 한 다이얼로그 내에서 포커싱이 순환될 수 있음.
        const firstFocusNode = focusableNodeList[0];
        const lastFocusNode = focusableNodeList[focusableNodeList.length - 1];

        // 첫 번째 포커스 요소에서 shift + tab 동시에 누르면? -> 마지막 포커스 요소로 이동!
        if (e.target === firstFocusNode && e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          lastFocusNode.focus();
        }

        // 마지막 포커스 요소에서 tab 누르면? -> 첫 번째 포커스 요소로 이동!
        if (e.target === lastFocusNode && !e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          firstFocusNode.focus();
        }
      };

      window.addEventListener("keydown", handleFocusTrap);

      // clean-up function
      return () => {
        dialogNode.removeAttribute("tabIndex");
        rootNode.removeAttribute("aria-hidden");
        window.removeEventListener("keydown", handleFocusTrap);
        rootNode.style.userSelect = "auto";
      };
  }, []);

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
    if (userKeywords === selectedKeywords) {
      onCancel();
      return;
    }
    onDone(selectedKeywords);
  };

  const cancelKeywordSelect = () => {
    setSelectedKeywords(userKeywords.length ? userKeywords : []);
    onCancel();
  };

  return (
    <Portal id={"dialog-container"}>
      <Container ref={dialogRef} label="관심 키워드 선택 다이얼로그">
        <CancelButton onClick={cancelKeywordSelect}>Cancel</CancelButton>
        <Backdrop $opacity={0.8} />
        <DialogContainer>
          <StyledList>
            {keywordArray.map((keyword) => {
              return (
                <li key={keyword}>
                  <Hashtag
                    type={keyword}
                    isSelected={selectedKeywords.indexOf(keyword) === -1}
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
    </Portal>
  );
}

/* ------------------------------- prop types ------------------------------- */

KeywordSelect.propTypes = {
  userKeywords: array,
  onDone: func,
  onCancel: func,
};
