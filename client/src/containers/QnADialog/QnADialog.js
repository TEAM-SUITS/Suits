import React, { useEffect, useState, useRef } from "react";
import Portal from "components/Portal/Portal";
import Dialog from "components/Dialog/Dialog";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import Divider from "components/Divider/Divider";
import Hashtag from "components/Hashtag/Hashtag";
import styled, { css } from "styled-components";
import {
  boxShadow,
  spoqaSmall,
  spoqaMedium,
  spoqaMediumLight,
} from "styles/common/common.styled";
import { bool, object } from "prop-types";
import API from "api/api";
import { ReactComponent as Spinner } from "components/Spinner/Spinner.svg";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import badwordFliter from "utils/badwordFilter/badwordFilter";
import { confirmAlert } from "react-confirm-alert";

/* ---------------------------- styled components --------------------------- */
const CardContainer = styled.div`
  > div {
    background-color: transparent;
    margin-top: 14px;
    box-shadow: none;
  }
`;

const HashtagContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-around;
  margin: 2em auto;
`;

const AnswerContainer = styled.div`
  margin: 3em auto 1em;
  position: relative;
  max-width: 347px;

  textarea {
    ${spoqaMedium}
    background-color: var(--color-gray2);
    padding: 1em;
    border: solid 1px var(--color-gray3);
    border-radius: 5px;
    width: 100%;
    height: 10em;
    resize: none;
    ${boxShadow}
  }
`;

const StyledButton = styled.button.attrs((props) => ({
  type: "button",
  disabled: props.disabled,
}))`
  background-color: ${({ disabled }) =>
    disabled ? "var(--color-gray3)" : "var(--color-gray5)"};
  color: var(--color-gray1);
  border: none;
  border-radius: 5px;
  width: 60px;
  ${boxShadow}
  ${spoqaMedium}
  padding: 0 3px;
  position: absolute;
  bottom: 0.6em;
  right: 0.3em;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
`;

const SkeletonStyle = css`
  min-width: 305px;
  max-width: 688px;
  margin: 3em;
  background-color: #e6e6e6;

  @media screen and (max-width: 480px) {
    margin: 3em auto;
  }
`;

const SkeletonCard = styled(Skeleton)`
  ${SkeletonStyle}
  padding: 1em;
  border-radius: 10px;
  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 248px;
    width: 248px;
  }
`;

const SkeletonDivider = styled(Skeleton)`
  ${SkeletonStyle}
  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 200px;
    width: 200px;
    margin: 3em auto;
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

/* ------------------------------- 답변 영역 분기 처리 ------------------------------ */
const Answers = ({ answersList = [], userId = "", handleRefresh }) => {
  // 사용자가 답변을 수정하는 중인지
  const [editing, setEditing] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (answerId, answerContent) => {
    setEditing(answerId);
    setEditContent(answerContent);
  };

  const handleEditContent = (e) => {
    setEditContent(e.target.value);
  };

  const postContent = async (answerId, newContent) => {
    await API(`/api/answers/${answerId}`, "patch", {
      content: badwordFliter.filter(newContent, "**"),
    });

    setEditing(null);
    handleRefresh();
  };

  const handleRemove = (answerId) => {
    const removeAnswer = async () => {
      await API(`/api/answers/${answerId}`, "delete");
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <StyledConfirmAlert>
            <h1>답변 삭제</h1>
            <p>정말로 답변을 삭제하시겠습니까?</p>
            <div>
              <button onClick={onClose}>취소</button>
              <button
                onClick={() => {
                  removeAnswer();
                  onClose();
                  handleRefresh();
                }}
              >
                삭제
              </button>
            </div>
          </StyledConfirmAlert>
        );
      },
    });
  };

  if (!answersList.length) {
    return <QnAContent answer={false} isEllipsis={false} />;
  }

  return (
    answersList !== [] &&
    answersList.map((answer) => {
      return (
        <React.Fragment key={answer._id}>
          {editing === answer._id ? (
            <EditContainer>
              <EditArea
                value={editContent}
                onChange={(e) => handleEditContent(e)}
              />
              <EditConfirmButton
                onClick={() => {
                  postContent(answer._id, editContent);
                  // handleRefresh();
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
                  <EditorOnlyButton onClick={() => handleRemove(answer._id)}>
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

const InputArea = ({
  isAnswered,
  isInputLoading,
  questionId,
  handleIsAnswered,
  handleRefresh,
}) => {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); // Post 버튼 비활성화 여부

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const postContent = async () => {
    await API("/api/answers", "post", {
      content: badwordFliter.filter(content, "**"),
      questionId,
    });

    handleIsAnswered();
    handleRefresh();
  };

  if (isInputLoading) {
    return <Spinner />;
  }

  if (isAnswered) return null;

  return (
    <AnswerContainer>
      <textarea onChange={(e) => handleContent(e)} />
      <StyledButton
        disabled={isDisabled}
        onClick={() => {
          if (content === "") return;

          setIsDisabled(true);
          postContent();
          // handleRefresh();
        }}
      >
        등록
      </StyledButton>
    </AnswerContainer>
  );
};

/* ------------------------------- QnA Dialog ------------------------------- */
export default function QnADialog({
  isVisible,
  question = {},
  onClick, // 닫기 버튼 제어
  handleRefresh,
}) {
  const { currentUserData: userData } = useSelector(
    (state) => state.currentUser
  );

  const [isAnswered, setIsAnswered] = useState(null);
  const [isInputLoading, setIsInputLoading] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    setCurrentQuestion(question);
    setIsAnswered(true);
    setIsInputLoading(true);
    const getIsAnswered = async (questionId) => {
      const userData = await API("/api/user-profile", "get");
      const check = userData[0].answeredQuestions.find(
        ({ _id }) => _id === questionId
      );
      // const getIsAnswered = (questionId) => {
      //   const check =
      //     userData &&
      //     userData[0].answeredQuestions.find(({ _id }) => _id === questionId);

      check ? setIsAnswered(true) : setIsAnswered(false);
      setIsInputLoading(false);
    };

    if (question._id) {
      getIsAnswered(question._id);
    }
  }, [question, question._id]);

  const handleIsAnswered = () => {
    setIsAnswered(true);
  };

  return (
    <Portal id={"dialog-container"}>
      <Dialog
        visible={isVisible} // 상위 컴포넌트의 state로 handle
        label="QnA 상세 내용"
        onClick={onClick}
      >
        <CardContainer>
          {Object.keys(currentQuestion).length ? (
            <Card isDialog isQuestion title={currentQuestion.content}>
              <HashtagContainer>
                {currentQuestion.hashTag.map((keyword, idx) => {
                  return <Hashtag key={idx} type={keyword} />;
                })}
              </HashtagContainer>
              <Answers
                answersList={currentQuestion.answers}
                userId={userData[0]._id}
                handleRefresh={handleRefresh}
              />
              <InputArea
                isAnswered={isAnswered}
                isInputLoading={isInputLoading}
                questionId={question._id}
                handleIsAnswered={handleIsAnswered}
                handleRefresh={handleRefresh}
              />
            </Card>
          ) : (
            <>
              <SkeletonCard variant="rect" height="3em" />
              <SkeletonDivider variant="rect" height="1px" />
              <SkeletonCard variant="rect" height="5em" />
              <SkeletonCard variant="rect" height="20em" />
            </>
          )}
        </CardContainer>
      </Dialog>
    </Portal>
  );
}

/* ------------------------------- prop types ------------------------------- */

QnADialog.propTypes = {
  isVisible: bool.isRequired,
  question: object.isRequired,
};
