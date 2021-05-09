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
import { fetchCurrentUserData } from 'redux/storage/currentUser/currentUser';
import badwordFilter from 'utils/badwordFilter/badwordFilter';
import useScrollDetect from 'hooks/useScrollDetect';
import getHashTagColor from 'utils/getHashTagColor/getHashTagColor';

/* ---------------------------- styled components --------------------------- */
const HeadingContainer = styled.div`
  z-index: 100;
  background-color: var(--color-body);
  width: 100vw;
  margin-bottom: 3em;
  display: flex;
  position: fixed;
  top: 4.5em;
  align-items: center;
  justify-content: center;
  height: 15em;
  transition: height 0.2s ease-out;

  // 스크롤된 상태일때 높이 변화
  ${({ isScrolled }) =>
    isScrolled &&
    css`
      flex-flow: column;
      height: 5em;

      div {
        display: flex;
        align-items: center;
      }
    `}

  // 스크롤된 상태 + 화면이 640 보다 작을때 태그가 보이지 않기 때문에 배경화면으로 대체
  ${({ isScrolled, bgColor }) =>
    isScrolled &&
    bgColor &&
    css`
      @media screen and (max-width: 640px) {
        background-color: var(${bgColor});
      }
    `};

  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 100%;
  }
`;

const StyledHeader = styled.h2`
  font-size: 2rem;
  max-width: 50%;
  min-width: 350px;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 1.4em;
  ${({ isScrolled }) =>
    isScrolled &&
    css`
      padding: 0.5em;
      font-size: 1.4rem;
    `}
`;

const HashtagContainer = styled.div`
  width: 244px;
  display: flex;
  margin: 2em auto;
  justify-content: space-evenly;

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      && {
        @media screen and (max-width: 640px) {
          display: none;
        }
      }
    `}
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
  const {
    currentQuestion: questionData,
    // isLoading
  } = useSelector((state) => state.currentQuestion);
  // user 정보
  const { currentUserData: userData } = useSelector((state) => state.currentUser);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);
  const isScrolled = useScrollDetect();
  const dispatch = useDispatch();
  // handlers
  const handleIsAnswered = () => {
    setIsAnswered(true);
  };

  const postAnswer = async (content, handleDisabled, handleEmptyContent) => {
    try {
      if (content.length < 10) {
        dispatch(setError('답변은 10자 이상 입력하셔야 합니다.'));
        return;
      }

      handleDisabled();

      await axios.post('/api/answers', {
        content: badwordFilter.filter(content, '**'),
        questionId: qid,
      });
      dispatch(fetchCurrentQuestion(qid));
      dispatch(fetchCurrentUserData());

      handleDisabled();
      handleEmptyContent();
      handleIsAnswered();
    } catch (err) {
      dispatch(setError('답변 등록 중 문제가 발생했습니다.'));
    }
  };

  const removeAnswer = async (answerId) => {
    try {
      await axios.delete(`/api/answers/${answerId}`);
      dispatch(fetchCurrentQuestion(qid));
      dispatch(fetchCurrentUserData());
    } catch (err) {
      dispatch(setError('답변 삭제 중 문제가 발생했습니다.'));
    }
  };

  const patchAnswer = async (answerId, newContent, handleDisabled, handleEditing) => {
    try {
      if (newContent.length < 10) {
        dispatch(setError('답변은 10자 이상 입력하셔야 합니다.'));
        return;
      }

      handleDisabled();

      await axios.patch(`/api/answers/${answerId}`, {
        content: badwordFilter.filter(newContent, '**'),
      });
      await dispatch(fetchCurrentQuestion(qid));
      dispatch(fetchCurrentUserData());

      handleDisabled();
      handleEditing();
    } catch (err) {
      dispatch(setError('답변 등록 중에 문제가 발생했습니다.'));
    }
  };

  // effect
  useEffect(() => {
    return () => dispatch(fetchCurrentQuestion()); // to set questionData null
  }, [dispatch]);

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
            <HeadingContainer isScrolled={isScrolled} bgColor={getHashTagColor(questionData?.hashTag[0])}>
              <div>
                <HashtagContainer isScrolled={isScrolled}>
                  {questionData.hashTag.map((keyword, idx) => {
                    return <Hashtag key={idx} type={keyword} />;
                  })}
                </HashtagContainer>
                <StyledHeader isScrolled={isScrolled}>{questionData.content}</StyledHeader>
              </div>
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
              <div>
                <HashtagContainer>
                  <SkeletonHashTag variant="text" animation="wave" />
                  <SkeletonHashTag variant="text" animation="wave" />
                </HashtagContainer>
                <StyledHeader>
                  <SkeletonCard variant="rect" height="2rem" width="100%" animation="wave" />
                  <SkeletonCard variant="rect" height="2rem" width="100%" animation="wave" />
                </StyledHeader>
              </div>
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
