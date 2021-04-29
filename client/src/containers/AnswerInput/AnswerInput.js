import { useState, useEffect } from 'react';

// comps
import { ReactComponent as Spinner } from 'components/Spinner/Spinner.svg';

// styles
import styled from 'styled-components';
import { boxShadow, spoqaMedium, spoqaLarge, spoqaMediumLight } from 'styles/common/common.styled';

// etc.
import badwordFilter from 'utils/badwordFilter/badwordFilter';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from 'redux/storage/error/error';
import { fetchCurrentQuestion } from 'redux/storage/post/post';

/* ---------------------------- styled components --------------------------- */
const AnswerContainer = styled.div`
  margin: 3em auto 1em;
  position: relative;
  max-width: 688px;
  width: 70vw;
  text-align: center;

  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 350px;
  }
`;

const StyledTextAreaContainer = styled.div`
  position: relative;
  width: 50vw;
  max-width: 500px;
  margin: 0 auto;
  height: 16em;
  background-color: var(--color-gray2);
  ${boxShadow};

  // 모바일
  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;

const StyledTextarea = styled.textarea`
  ${spoqaMedium}
  background-color: var(--color-gray2);
  padding: 1em 1em 0.4em;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 8em;
  resize: none;
`;

const StyledContentLength = styled.span`
  position: absolute;
  bottom: 0.4em;
  left: 1em;
  ${spoqaMediumLight};
  color: var(--color-black);
`;

const StyledButton = styled.button.attrs((props) => ({
  type: 'button',
  disabled: props.disabled,
}))`
  display: block;
  margin: 2rem auto;
  background-color: ${({ disabled }) => (disabled ? 'var(--color-gray3)' : 'var(--color-gray5)')};
  border: none;
  border-radius: 5px;
  width: 60px;
  ${boxShadow}
  ${spoqaLarge}
  padding: 0 3px;
  cursor: ${({ disabled }) => (disabled ? 'wait' : 'pointer')};
  color: var(--color-gray1);
  font-size: 1.6rem;
`;

/* ------------------------------- input area ------------------------------- */
export default function InputArea({ isAnswered, isInputLoading, questionId, handleIsAnswered, postAnswer }) {
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false); // Post 버튼 비활성화 여부

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  if (isInputLoading) {
    return <Spinner />;
  }

  if (isAnswered) return null;

  return (
    <AnswerContainer>
      <StyledTextAreaContainer>
        <StyledTextarea onChange={(e) => handleContent(e)} maxLength="200" />
        <StyledContentLength>{content ? content.length : 0}/200</StyledContentLength>
      </StyledTextAreaContainer>
      <StyledButton
        disabled={isDisabled}
        onClick={async () => {
          if (content === '') return;

          await postAnswer(content);
          setIsDisabled(true);
        }}
      >
        등록
      </StyledButton>
    </AnswerContainer>
  );
}
