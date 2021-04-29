import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// components
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import Hashtag from 'components/Hashtag/Hashtag';
import Answers from 'containers/AnswerContainer/AnswerContainer';
import InputArea from 'containers/AnswerInput/AnswerInput';
import { Skeleton } from '@material-ui/lab';
// etc.
import { pageEffect } from 'styles/motions/variants';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from 'redux/storage/error/error';
import { fetchCurrentQuestion } from 'redux/storage/post/post';
import badwordFilter from 'utils/badwordFilter/badwordFilter';

/* ---------------------------- styled components --------------------------- */
const HeadingContainer = styled.span`
  background-color: var(--color-body);
  width: 100vw;
  margin-bottom: 3em;

  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 100vw;
  }
`;

const StyledHeader = styled.h2`
  font-size: 2rem;
  max-width: 50%;
  min-width: 350px;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 1.4em;
`;

const HashtagContainer = styled.div`
  width: 244px;
  display: flex;
  margin: 2em auto;
  justify-content: space-evenly;
  > div {
  }
`;

// 💀 skeleton ui
const SkeletonStyle = css`
  /* min-width: 305px;
  max-width: 688px; */
  width: ${(props) => props.width};
  margin: 1.6rem;
  background-color: #e6e6e6;
  @media screen and (max-width: 480px) {
    margin: 1.6rem auto;
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

const SkeletonHashTag = styled(Skeleton)`
  & {
    ${SkeletonStyle}
    padding: 0.3em 1em;
    border-radius: 10px;
    width: 7.2em;
  }
`;

const SkeletonAnswer = styled.div`
  margin: 0 auto;
  width: 350px;
`;

const SkeletonProfile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

/* -------------------------------- post page ------------------------------- */
export default function PostPage({ history, location, match }) {
  // question 정보
  const { qid } = match.params;
  // const [data, setData] = useState({}); // question data
  const { currentQuestion: questionData } = useSelector((state) => state.currentQuestion);
  // user 정보
  const { currentUserData: userData } = useSelector((state) => state.currentUser);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);

  const dispatch = useDispatch();

  // handlers
  const handleIsAnswered = () => {
    setIsAnswered(true);
  };

  const postAnswer = async (content) => {
    try {
      await axios.post('/api/answers', {
        content: badwordFilter.filter(content, '**'),
        questionId: qid,
      });
      dispatch(fetchCurrentQuestion(qid));
      handleIsAnswered();
    } catch (err) {
      dispatch(setError('답변 등록 중 문제가 발생했습니다.'));
    }
  };

  const removeAnswer = async (answerId) => {
    try {
      await axios.delete(`/api/answers/${answerId}`);
      dispatch(fetchCurrentQuestion(qid));
    } catch (err) {
      dispatch(setError('답변 삭제 중 문제가 발생했습니다.'));
    }
  };

  const patchAnswer = async (answerId, newContent) => {
    try {
      await axios.patch(`/api/answers/${answerId}`, {
        content: badwordFilter.filter(newContent, '**'),
      });
      await dispatch(fetchCurrentQuestion(qid));
    } catch (err) {
      dispatch(setError('답변 등록 중에 문제가 발생했습니다.'));
    }
  };

  // effect
  useEffect(() => {
    if (!questionData) dispatch(fetchCurrentQuestion(qid));
    // answer 입력창 렌더링 여부 판별
    setIsAnswered(true);
    setIsInputLoading(true);
    const getIsAnswered = async (questionId) => {
      try {
        const res = await axios.get('/api/user-profile');
        const userData = res.data;
        const check = userData[0].answeredQuestions.find(({ _id }) => _id === questionId);

        check ? setIsAnswered(true) : setIsAnswered(false);
      } catch (err) {
        dispatch(setError('질문에 대한 답변 기록을 불러오는 데 문제가 발생했습니다.'));
      } finally {
        setIsInputLoading(false);
      }
    };

    if (questionData) {
      getIsAnswered(qid);
    }

    return () => {
      setIsAnswered(false);
      setIsInputLoading(false);
    };
  }, [dispatch, questionData, qid]);

  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer page="post" variants={pageEffect} initial="hidden" animate="visible">
        {questionData && userData ? (
          <>
            <HeadingContainer>
              <HashtagContainer>
                {questionData.hashTag.map((keyword, idx) => {
                  return <Hashtag key={idx} type={keyword} />;
                })}
              </HashtagContainer>
              <StyledHeader>{questionData.content}</StyledHeader>
            </HeadingContainer>
            <Answers
              answersList={questionData.answers}
              userId={userData[0]._id}
              questionId={qid}
              removeAnswer={removeAnswer}
              patchAnswer={patchAnswer}
            />
            <InputArea
              isAnswered={isAnswered}
              isInputLoading={isInputLoading}
              questionId={qid}
              handleIsAnswered={handleIsAnswered}
              postAnswer={postAnswer}
            />
          </>
        ) : (
          <>
            <HeadingContainer>
              <HashtagContainer>
                <SkeletonHashTag variant="text" animation="wave" />
                <SkeletonHashTag variant="text" animation="wave" />
              </HashtagContainer>

              <StyledHeader>
                <SkeletonCard variant="rect" height="2rem" width="100%" animation="wave" />
                <SkeletonCard variant="rect" height="2rem" width="100%" animation="wave" />
              </StyledHeader>
            </HeadingContainer>
            <SkeletonAnswer>
              <SkeletonProfile>
                <Skeleton variant="circle" width="8em" height="8em" animation="wave" />
                <div>
                <Skeleton variant="text" width="15em" animation="wave" />
                <Skeleton variant="text" width="15em" animation="wave" />
                </div>
                <Skeleton variant="text" width="3em" height="5em" animation="wave" />
              </SkeletonProfile>
              <SkeletonCard variant="rect" height="20em" animation="wave" width="100%" />
              <SkeletonCard variant="rect" height="20em" animation="wave" width="100%" />
              <SkeletonCard variant="rect" height="20em" animation="wave" width="100%" />
            </SkeletonAnswer>
          </>
        )}
      </PageContainer>
    </>
  );
}
