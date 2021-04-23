import React, { useEffect, useState } from "react";
import Portal from "components/Portal/Portal";
import Dialog from "components/Dialog/Dialog";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import Divider from "components/Divider/Divider";
import Hashtag from "components/Hashtag/Hashtag";
import styled, { css } from "styled-components";
import {
  boxShadowBlack,
  spoqaMedium,
  spoqaMediumLight,
} from "styles/common/common.styled";
import { bool, object } from "prop-types";
import API from "api/api";
import { ReactComponent as Spinner } from "components/Spinner/Spinner.svg";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";

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
    background-color: var(--color-lightgray2);
    padding: 1em;
    border: solid 1px var(--color-gray1);
    border-radius: 5px;
    width: 100%;
    height: 10em;
    resize: none;
    ${boxShadowBlack}
  }

  button {
    background-color: var(--color-gray3);
    color: var(--color-lightgray1);
    border: none;
    border-radius: 5px;
    width: 60px;
    ${boxShadowBlack}
    ${spoqaMedium}
    padding: 0 3px;
    position: absolute;
    bottom: 0.6em;
    right: 0.3em;
    cursor: pointer;
  }
`;

const SkeletonStyle = css`
  min-width: 305px;
  max-width: 688px;
  margin: 3em;
  background-color: #e6e6e6;
`;

const SkeletonCard = styled(Skeleton)`
  ${SkeletonStyle}
  padding: 1em;
  border-radius: 10px;
  width: ${(props) => props.width};
`;

const SkeletonDivider = styled(Skeleton)`
  ${SkeletonStyle}
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

const InputArea = ({ isAnswered, isInputLoading }) => {
  if (isInputLoading) {
    return <Spinner />;
  }

  if (isAnswered) return null;

  return (
    <AnswerContainer>
      <textarea />
      <button>Post</button>
    </AnswerContainer>
  );
};

/* ------------------------------- QnA Dialog ------------------------------- */
export default function QnADialog({
  isVisible,
  question = {},
  onClick, // 닫기 버튼 제어
}) {
  const { currentUserData: userData } = useSelector(
    (state) => state.currentUser
  );
  const [isAnswered, setIsAnswered] = useState(null);
  const [isInputLoading, setIsInputLoading] = useState(null);

  useEffect(() => {
    setIsInputLoading(true);
    const getIsAnswered = (questionId) => {
      const check =
        userData &&
        userData[0].answeredQuestions.find(({ _id }) => _id === questionId);

      check ? setIsAnswered(true) : setIsAnswered(false);
      setIsInputLoading(false);
    };

    if (question._id) {
      getIsAnswered(question._id);
    }

    return () => {
      isVisible = false;
    };
  }, [question._id]);

  // if (!Object.keys(question).length) return null;

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
