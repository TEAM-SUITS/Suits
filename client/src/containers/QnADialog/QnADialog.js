import { useEffect, useState } from 'react';
import Portal from 'components/Portal/Portal';
import Dialog from 'components/Dialog/Dialog';
import Card from 'components/Card/Card';
import QnAContent from 'components/Content/QnAContent';
import Divider from 'components/Divider/Divider';
import Hashtag from 'components/Hashtag/Hashtag';
import styled from 'styled-components';
import {
  boxShadowBlack,
  spoqaMedium,
  spoqaMediumLight,
} from 'styles/common/common.styled';
import { bool, object } from 'prop-types';
import API from 'api/api';

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

/* ------------------------------- 답변 영역 분기 처리 ------------------------------ */
const Answers = ({ answersList = [] }) => {
  if (!answersList.length) {
    return (
      <QnAContent
        answer={false}
        isEllipsis={false}
      />
    )
  }

  return (
    answersList !== [] &&
    answersList.map((answer) => {
      return (
        <>
          <QnAContent
            key={answer._id + 1}
            answer={answer}
            isEllipsis={false}
          />
          <Divider
            key={answer._id + 2}
            primary={false}
            color="gray"
            height="1px"
            width="50%"
          />
        </>
      );
    })
  );
};

const InputArea = ({ isAnswered }) => {
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
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const getIsAnswered = async questionId => {
      const userData = await API('/api/user-profile', 'get');

      userData[0].answeredQuestions.forEach(({ _id }) => {
        if (_id === questionId) setIsAnswered(true);
      });
    };

    if (question._id) {
      getIsAnswered(question._id);
    }
  }, [question._id]);

  if (!Object.keys(question).length) return null;

  return (
    <Portal id={'dialog-container'}>
      <Dialog
        visible={isVisible} // 상위 컴포넌트의 state로 handle
        label="QnA 상세 내용"
        onClick={onClick}
      >
        <CardContainer>
        <Card isDialog isQuestion title={question.content}>
          <HashtagContainer>
            {question.hashTag.map((keyword, idx) => {
              return <Hashtag key={idx} type={keyword} />
            })}
          </HashtagContainer>
          <Answers answersList={question.answers} />
          <InputArea isAnswered={isAnswered} />
        </Card>
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
