import { useState, useEffect } from "react";
import Portal from "components/Portal/Portal";
import Dialog from "components/Dialog/Dialog";
import styled, { css } from "styled-components";
import { resetBoxModel, spoqaMedium } from "styles/common/common.styled";

/* ---------------------------- styled components --------------------------- */
const AlertContainer = styled.section`
  width: 320px;
  height: 100px;
  text-align: center;
  margin: 0 auto;

  em {
    ${spoqaMedium}
  }

  // 모바일
  @media screen and (max-width: 480px) {
    width: 350px;
  }
`;

const ButtonStyle = css`
  background-color: var(--color-text);
  color: var(--color-body);
  ${resetBoxModel}
  ${spoqaMedium}
  font-weight: 700;
  padding: .3em .7em;
  margin: 1em;
  border-radius: 5px;
`;

const ConfirmButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  ${ButtonStyle}
  color: #ec8686;
`;

const CancelButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  ${ButtonStyle}
  color: var(--color-body);
`;

/* ------------------------------ Alert Dialog ------------------------------ */
export default function AlertDialog({ isVisible, onConfirm, onCancel, onClick }) {
  return (
    <Portal id={"dialog-container"}>
      <Dialog
        visible={isVisible}
        label="삭제 경고"
        onClick={onClick} // 닫기 버튼 제어
      >
        <AlertContainer>
          <p><em>정말 삭제하시겠습니까?</em></p>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
        </AlertContainer>
      </Dialog>
    </Portal>
  );
}