import React from "react";
import styled from "styled-components";
import Icon from "components/Icon/Icon";
import Portal from "components/Portal/Portal";
import { bool, string, node, oneOfType } from "prop-types";

/* ---------------------------- styled components --------------------------- */
const DialogContainer = styled.div.attrs((props) => ({
  role: "dialog",
  ariaModal: "true",
  ariaLabel: props.label,
}))`
  z-index: 99;
  background-color: var(--color-gray1);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  /* min-width: 305px; */
  border-radius: 10px;
  padding: 2em 0 0;
  max-width: 688px;

  @media screen and (min-width: 481px) {
    /* min-width: 400px; */
    /* min-height: 250px; */
  }

  // 모바일
  @media screen and (max-width: 480px) {
    width: 350px;
  }
`;

const CloseButton = styled.button.attrs(() => ({
  type: "button",
  "aria-label": "닫기",
}))`
  position: absolute;
  top: 1em;
  right: 1em;
  padding: 0.5em;
  background-color: transparent;
  border: none;

  line {
    stroke: var(--color-gray3);
  }
`;

const Header = styled.h1`
  text-align: center;
  display: block;
  margin-top: 0;
  font-size: 2rem;
`;

const Modal = styled.div.attrs(() => ({
  role: "presentation",
}))`
  max-width: 100%;
  z-index: 50;
  background-color: var(--color-black);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: ${(props) => props.$opacity};
`;

/* -------------------------------------------------------------------------- */
export default function Dialog({
  visible = false, // 다이얼로그 가시성 여부
  infoText = "", // content of h1
  label = infoText, // aria-label
  onClick, // 닫기 버튼
  children,
  opacity = 0.6,
}) {
  const dialogRef = React.useRef(null);

  // a11y
  React.useEffect(() => {
    if (visible) {
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
    }
  }, [visible]);

  // 🔴 사용하실 때는 아래와 같이
  // 이 컴포넌트를 Portal 컴포넌트로 감싸주세요!
  return (
    <>
      <Portal id={"dialog-container"}>
        {visible ? <Modal onClick={onClick} className="overlay" $opacity={opacity} /> : null}
        {visible && (
          <DialogContainer ref={dialogRef} label={label}>
            <CloseButton>
              <Icon
                onClick={onClick}
                type="close"
                title="닫기"
                height="1.8em"
              />
            </CloseButton>
            <Header>{infoText}</Header>
            {children}
          </DialogContainer>
        )}
      </Portal>
    </>
  );
}

Dialog.propTypes = {
  visible: bool.isRequired,
  infoText: string,
  label: string.isRequired,
  children: oneOfType([node, string]),
};
