import React, { useState } from 'react';

// components
import QnAContent from 'components/Content/QnAContent';
import Divider from 'components/Divider/Divider';
import { DividerContainer } from 'containers/DividerContainer/DividerContainer.styled';
// styles
import styled from 'styled-components';
import { boxShadow, spoqaMedium, spoqaMediumLight } from 'styles/common/common.styled';

// etc.
import AlertDialog from 'containers/AlertDialog/AlertDialog';

/* ---------------------------- styled components --------------------------- */
const EditContainer = styled.div`
  position: relative;
  height: 18rem;
  width: 70vw;
  max-width: 500px;
  background-color: var(--color-gray2);
  border-radius: 5px;

  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 350px;
  }
`;

const EditArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 14rem;
  resize: none;
  ${spoqaMedium}
  background-color: var(--color-gray2);
  padding: 1em 1em 0.4em;
  border: none;
`;

const EditContentLength = styled.span`
  position: absolute;
  bottom: 1em;
  left: 1em;
  ${spoqaMediumLight};
  color: var(--color-black);
`;

const EditConfirmButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background-color: ${({ disabled }) => (disabled ? 'var(--color-gray3)' : 'var(--color-gray5)')};
  cursor: ${({ disabled }) => (disabled ? 'wait' : 'pointer')};
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
  width: 50%;
  margin: 0 auto;

  > button {
    margin: 0 0.3rem;
    padding: 0 1rem;
  }
`;

const EditorOnlyButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background-color: var(--color-gray5);
  color: var(--color-gray1);
  ${spoqaMedium}
  font-weight: 700;
  font-size: 1.4rem;
  border: none;
  border-radius: 5px;

  &:last-child {
    background-color: #e86464;
    color: #ffffff;
  }
`;

/* --------------------------------- Answers -------------------------------- */
export default function Answers({ answersList = [], userId = '', removeAnswer, patchAnswer }) {
  // 사용자가 답변을 수정하는 중인지
  const [editing, setEditing] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false); // Post 버튼 비활성화 여부

  const handleEdit = (answerId, answerContent) => {
    setEditing(answerId);
    setEditContent(answerContent);
  };

  const handleEditContent = (e) => {
    setEditContent(e.target.value);
  };

  const handleDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  const handleEditing = () => {
    setEditing(null);
  };

  if (!answersList.length) {
    return <QnAContent answer={false} isEllipsis={false} />;
  }

  return (
    <>
      <AlertDialog
        isVisible={!!deleting}
        onConfirm={() => {
          setDeleting(null);
          removeAnswer(deleting);
          // handleRefresh();
        }}
        onCancel={() => setDeleting(null)}
        onClick={() => setDeleting(null)}
      />
      {answersList !== [] &&
        answersList.map((answer) => {
          return (
            <React.Fragment key={answer._id}>
              {editing === answer._id ? (
                <EditContainer>
                  <EditArea value={editContent} onChange={(e) => handleEditContent(e)} maxLength="200" />
                  {editing && <EditContentLength>{editContent ? editContent.length : 0}/200</EditContentLength>}
                  <EditConfirmButton
                    disabled={isDisabled}
                    onClick={() => patchAnswer(answer._id, editContent, handleDisabled, handleEditing)}
                  >
                    확인
                  </EditConfirmButton>
                  <EditConfirmButton onClick={handleEditing}>취소</EditConfirmButton>
                </EditContainer>
              ) : (
                <QnAContent answer={answer} isEllipsis={false} page="post" />
              )}
              {answer.postedby && answer.postedby._id === userId ? (
                <>
                  {!editing ? (
                    <ButtonContainer>
                      <EditorOnlyButton onClick={() => handleEdit(answer._id, answer.content)}>수정</EditorOnlyButton>
                      <EditorOnlyButton onClick={() => setDeleting(answer._id)}>삭제</EditorOnlyButton>
                    </ButtonContainer>
                  ) : null}
                </>
              ) : null}
              {!editing && (
                <DividerContainer>
                  <Divider primary={false} color="gray" height="2px" width="56%" minWidth="320px" />
                </DividerContainer>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}
