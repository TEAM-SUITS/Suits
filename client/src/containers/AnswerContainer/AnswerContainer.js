import React, { useState } from "react";

// components
import QnAContent from "components/Content/QnAContent";
import Divider from "components/Divider/Divider";

// styles
import styled, { css } from "styled-components";
import { boxShadow, spoqaMedium } from "styles/common/common.styled";

// etc.
import badwordFilter from "utils/badwordFilter/badwordFilter";
import API from "api/api";
// import { confirmAlert } from 'react-confirm-alert';
import AlertDialog from "containers/AlertDialog/AlertDialog";

/* ---------------------------- styled components --------------------------- */
// TODO: a11y dialog로 대체 필요
const StyledConfirmAlert = styled.div`
  background-color: var(--color-body);
  border: 2px solid var(--color-gray5);
  border-radius: 10px;
  padding: 2em 3em 1.5em;
  ${boxShadow}
  h1 {
    font-size: 1.8rem;
    text-align: center;
    margin: 0;
    color: var(--color-text);
  }
  p {
    font-size: 1.6rem;
    color: var(--color-text);
    margin-bottom: 2em;
  }
  div {
    display: flex;
    justify-content: center;
    button {
      font-size: 1.4rem;
      border: none;
      border: 1px solid var(--color-gray5);
      border-radius: 5px;
      background-color: var(--color-gray2);
      padding: 0.5em 2em;
      ${boxShadow}
      ${spoqaMedium}
      &:last-child {
        color: var(--color-red);
        margin-left: 3em;
        font-weight: bold;
      }
    }
  }
  @media screen and (min-width: 480px) {
    padding: 5em 6em 4em;
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 2rem;
    }
    button {
      font-size: 2rem;
    }
  }
`;

const EditContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
`;

const EditArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  resize: none;
  border-radius: 5px;
  ${spoqaMedium}
  background-color: var(--color-gray2);
  padding: 1em;
  border: solid 1px var(--color-gray3);
`;

const EditConfirmButton = styled.button.attrs(() => ({
  type: "button",
}))`
  background-color: var(--color-gray5);
  color: var(--color-gray1);
  border: none;
  border-radius: 5px;
  width: 60px;
  ${boxShadow}
  ${spoqaMedium}
  padding: 0 3px;
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;

  &:first-of-type {
    right: 7.2rem;
  }
`;

const ButtonContainer = styled.div`
  text-align: right;
  /* background-color: pink; */
  width: 70%;
  margin: 0 auto;

  > button {
    margin: 0 0.3rem;
    padding: 0 1rem;
  }
`;

const EditorOnlyButton = styled.button.attrs(() => ({
  type: "button",
}))`
  background-color: var(--color-gray5);
  color: var(--color-gray1);
  ${spoqaMedium}
  font-size: 1.4rem;
  border: none;
  border-radius: 5px;

  &:last-child {
    background-color: var(--color-orange);
    color: var(--color-text);
  }
`;

/* --------------------------------- Answers -------------------------------- */
export default function Answers({ answersList = [], userId = "", handleRefresh, removeAnswer }) {
  // 사용자가 답변을 수정하는 중인지
  const [editing, setEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (answerId, answerContent) => {
    setEditing(answerId);
    setEditContent(answerContent);
  };

  const handleEditContent = (e) => {
    setEditContent(e.target.value);
  };

  const postContent = async (answerId, newContent) => {
    await API(`/api/answers/${answerId}`, 'patch', {
      content: badwordFilter.filter(newContent, "**"),
    });

    setEditing(null);
    handleRefresh();
  };

  if (!answersList.length) {
    return <QnAContent answer={false} isEllipsis={false} />;
  }

  return (
    answersList !== [] &&
    answersList.map((answer) => {
      return (
        <React.Fragment key={answer._id}>
          <AlertDialog
            isVisible={isDeleting}
            onConfirm={() => {
              setIsDeleting(false);
              removeAnswer(answer._id);
              handleRefresh();
            }}
            onCancel={() => setIsDeleting(false)}
            onClick={() => setIsDeleting(false)}
          />
          {editing === answer._id ? (
            <EditContainer>
              <EditArea
                value={editContent}
                onChange={(e) => handleEditContent(e)}
              />
              <EditConfirmButton
                onClick={() => {
                  postContent(answer._id, editContent);
                }}
              >
                확인
              </EditConfirmButton>
              <EditConfirmButton onClick={() => setEditing(null)}>
                취소
              </EditConfirmButton>
            </EditContainer>
          ) : (
            <QnAContent answer={answer} isEllipsis={false} />
          )}
          {answer.postedby && answer.postedby._id === userId ? (
            <>
            {!editing ? (
              <ButtonContainer>
                <EditorOnlyButton
                  onClick={() => handleEdit(answer._id, answer.content)}
                >
                  수정
                </EditorOnlyButton>
                <EditorOnlyButton
                  onClick={() => setIsDeleting(true)}
                >
                  삭제
                </EditorOnlyButton>
              </ButtonContainer>
            ) : null}
            </>
          ) : null}
          <Divider primary={false} $color="gray" $height="1px" $width="70%" />
        </React.Fragment>
      );
    })
  );
};