import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// components
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import Hashtag from 'components/Hashtag/Hashtag';
import Answers from 'containers/AnswerContainer/AnswerContainer';
import InputArea from 'containers/AnswerInput/AnswerInput';
// etc.
import { pageEffect } from 'styles/motions/variants';
import styled, { css } from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from 'redux/storage/error/error';
import { fetchCurrentQuestion } from "redux/storage/post/post";

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
  const [data, setData] = useState({}); // question data
  // user 정보
  const { currentUserData: userData } = useSelector((state) => state.currentUser);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);

  const dispatch = useDispatch();

  // post page를 위한 question 정보 받아오기
  const getData = async (id) => {
    try {
      const res = await axios.get(`/api/questions/${id}`);
      setData(res.data);
    } catch (err) {
      dispatch(setError('질문을 불러들이는 중 문제가 발생했습니다.'));
    }
  };

  const removeAnswer = async (answerId) => {
    try {
      const updatedQuestion = await axios.delete(`/api/answers/${answerId}`);
      setData(updatedQuestion);
    } catch (err) {
      dispatch(setError('답변 삭제 중 문제가 발생했습니다.'));
    }
  };

  // effect
  useEffect(() => {
    dispatch(fetchCurrentQuestion(qid));
    getData(qid);
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
    if (data._id) {
      getIsAnswered(data._id);
    }

    return () => {
      setIsAnswered(false);
      setIsInputLoading(false);
    };
  }, [qid, data._id]);
  // handlers
  const handleIsAnswered = () => {
    setIsAnswered(true);
  };
  // 새로고침
  const handleRefresh = async () => {
    await getData(qid);
    // history.push(location.pathname);
    history.push({ pathname: '/' });
    history.replace({ pathname: location.pathname });
  };
  // data === {} 일 때 로딩 지연 처리 필요
  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer page="post" variants={pageEffect} initial="hidden" animate="visible">
        {Object.keys(data).length && userData ? (
          <>
            <HeadingContainer>
              <HashtagContainer>
                {data.hashTag.map((keyword, idx) => {
                  return <Hashtag key={idx} type={keyword} />;
                })}
              </HashtagContainer>
              <StyledHeader>{data.content}</StyledHeader>
            </HeadingContainer>
            <Answers
              answersList={data.answers}
              userId={userData[0]._id}
              handleRefresh={handleRefresh}
              removeAnswer={removeAnswer}
            />
            <InputArea
              isAnswered={isAnswered}
              isInputLoading={isInputLoading}
              questionId={data._id}
              handleIsAnswered={handleIsAnswered}
              handleRefresh={handleRefresh}
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
                <Skeleton variant="text" width="15em" animation="wave" />
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
