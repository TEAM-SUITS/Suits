import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import PageContainer from "containers/PageContainer/PageContainer.styled";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Hashtag from "components/Hashtag/Hashtag";
import Answers from "containers/AnswerContainer/AnswerContainer";
import InputArea from "containers/AnswerInput/AnswerInput";
// etc.
import { pageEffect } from "styles/motions/variants";
import styled, { css } from "styled-components";
import API from "api/api";
// TODO: API 말고 그냥 axios로 수정
import { Skeleton } from "@material-ui/lab";


/* ---------------------------- styled components --------------------------- */
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
  &:first-child {
    margin-top: 45px;
  }
`;

const SkeletonDivider = styled(Skeleton)`
  ${SkeletonStyle}
  // 모바일
  @media screen and (max-width: 480px) {
    min-width: 200px;
    width: 200px;
  }
`;

const HeadingContainer = styled.div`
  background-color: var(--color-body);
  width: 100%;
  margin-bottom: 3em;
`;

/* -------------------------------- post page ------------------------------- */
export default function PostPage({ history, location, match }) {
  // question 정보
  const { qid } = match.params;
  const [data, setData] = useState({}); // question data
  // user 정보
  const { currentUserData: userData } = useSelector(
    (state) => state.currentUser
  );
  const [isAnswered, setIsAnswered] = useState(null);
  const [isInputLoading, setIsInputLoading] = useState(null);
  // post page를 위한 question 정보 받아오기
  const getData = async (id) => {
    const res = await API(`/api/questions/${id}`, 'get');
    setData(res);
  };
  const removeAnswer = async (answerId) => {
    const updatedQuestion = await API(`/api/answers/${answerId}`, 'delete');
    setData(updatedQuestion);
  };
  // effect
  useEffect(() => {
    getData(qid);
    // answer 입력창 렌더링 여부 판별
    setIsAnswered(true);
    setIsInputLoading(true);
    const getIsAnswered = async (questionId) => {
      const userData = await API("/api/user-profile", "get");
      const check = userData[0].answeredQuestions.find(
        ({ _id }) => _id === questionId
      );
      check ? setIsAnswered(true) : setIsAnswered(false);
      setIsInputLoading(false);
    };
    if (data._id) {
      getIsAnswered(data._id);
    }
  }, [qid, data._id]);
  // handlers
  const handleIsAnswered = () => {
    setIsAnswered(true);
  };
  // 새로고침
  const handleRefresh = async () => {
    await getData(qid);
    // history.push(location.pathname);
    history.push({ pathname: "/" });
    history.replace({ pathname: location.pathname });
  };
  // data === {} 일 때 로딩 지연 처리 필요
  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer
        page="post"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
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
              {/* <Divider
                width="60%"
                height="3px"
                color="var(--color-text)"
                minWidth="340px"
              /> */}
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
              <SkeletonCard variant="rect" height="3em" width="30%" />
              <SkeletonCard variant="rect" height="3em" width="50%" />
              <SkeletonDivider variant="rect" height="1px" width="50%" />
              <SkeletonCard variant="rect" height="5em" width="50%" />
              <SkeletonCard variant="rect" height="20em" width="60%" />
              <SkeletonCard variant="rect" height="20em" width="60%" />
              <SkeletonCard variant="rect" height="20em" width="60%" />
            </>
          )}
      </PageContainer>
    </>
  );
};