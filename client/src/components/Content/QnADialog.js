import Portal from 'components/Portal/Portal';
import Dialog from 'components/Dialog/Dialog';
import Card from 'components/Card/Card';
import QnAContent from './QnAContent';
import Divider from 'components/Divider/Divider';
import Hashtag from 'components/Hashtag/Hashtag';
import styled from 'styled-components';
import {
  boxShadowBlack,
  spoqaMedium,
  spoqaMediumLight,
} from 'styles/common/common.styled';
import { bool, array } from 'prop-types';

/* -------------------------------------------------------------------------- */

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

/* ---------------------------- styled components --------------------------- */

export default function QnADialog({ isVisible, question }) {
  return (
    <Portal id={'dialog-container'}>
      <Dialog
        visible={isVisible} // 상위 컴포넌트의 state로 handle
        label="QnA 상세 내용"
      >
        <Card isQuestion title={question.content}>
          <HashtagContainer>
            {question.keywords.map((keyword) => {
              return <Hashtag type={keyword} />;
            })}
          </HashtagContainer>
          {question.answer.map((answer) => {
            return (
              <>
                <QnAContent answer={answer} isEllipsis={false} />
                <Divider
                  primary={false}
                  color="gray"
                  height="1px"
                  width="50%"
                />
              </>
            );
          })}
          <AnswerContainer>
            <textarea />
            <button>Post</button>
          </AnswerContainer>
        </Card>
      </Dialog>
    </Portal>
  );
}

/* ------------------------------- prop types ------------------------------- */

QnADialog.propTypes = {
  isVisible: bool,
  question: array,
};
