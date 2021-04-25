import React, { useEffect, useState } from "react";
import Portal from "components/Portal/Portal";
import Dialog from "components/Dialog/Dialog";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import Divider from "components/Divider/Divider";
import Hashtag from "components/Hashtag/Hashtag";
import styled, { css } from "styled-components";
import {
  boxShadow,
  spoqaMedium,
  spoqaMediumLight,
} from "styles/common/common.styled";
import { bool, object } from "prop-types";
import API from "api/api";
import { ReactComponent as Spinner } from "components/Spinner/Spinner.svg";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import badwordFliter from "utils/badwordFilter/badwordFilter";

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
    ${spoqaMediumLight}
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

/* ------------------------------- 답변 영역 분기 처리 ------------------------------ */
const Answers = ({ answersList = [] }) => {
  if (!answersList.length) {
    return <QnAContent answer={false} isEllipsis={false} />;
  }

  return (
    answersList !== [] &&
    answersList.map((answer) => {
      return (
        <React.Fragment key={answer._id}>
          <QnAContent answer={answer} isEllipsis={false} />
          <Divider primary={false} color="gray" height="1px" width="50%" />
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
  refreshQuestion,
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
    refreshQuestion();
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
          setIsDisabled(true);
          postContent();
        }}
      >
        Post
      </StyledButton>
    </AnswerContainer>
  );
};

/* ------------------------------- QnA Dialog ------------------------------- */
export default function QnADialog({
  isVisible,
  question = {},
  onClick, // 닫기 버튼 제어
  refreshQuestion,
}) {
  // const { currentUserData: userData } = useSelector(
  //   (state) => state.currentUser
  // );
  const [isAnswered, setIsAnswered] = useState(null);
  const [isInputLoading, setIsInputLoading] = useState(null);
  // InputArea로부터 상태 끌어올리기
  // const [content, setContent] = useState('');

  useEffect(() => {
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
  }, [question._id]);

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
          {Object.keys(question).length ? (
            <Card isDialog isQuestion title={question.content}>
              <HashtagContainer>
                {question.hashTag.map((keyword, idx) => {
                  return <Hashtag key={idx} type={keyword} />;
                })}
              </HashtagContainer>
              <Answers answersList={question.answers} />
              <InputArea
                isAnswered={isAnswered}
                isInputLoading={isInputLoading}
                questionId={question._id}
                handleIsAnswered={handleIsAnswered}
                refreshQuestion={refreshQuestion}
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
