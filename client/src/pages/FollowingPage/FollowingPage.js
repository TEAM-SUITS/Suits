import { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { resetList, spoqaMedium, spoqaLarge } from "styles/common/common.styled";
import { Link } from "react-router-dom";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Hashtag from "components/Hashtag/Hashtag";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowingData } from "redux/storage/following/following";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import QnADialog from "containers/QnADialog/QnADialog";
import API from "api/api";
import { Skeleton } from "@material-ui/lab";

/* ---------------------------- styled components --------------------------- */
const HashtagList = styled.ul`
  ${resetList}
  width: 400px;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-around;

  // 모바일
  @media screen and (max-width: 480px) {
    width: 340px;
  }
`;

const CardList = styled.ul`
  ${resetList}

  > li {
    width: 470px;
    max-width: 688px;

    // 모바일
    @media screen and (max-width: 480px) {
      width: 350px;
    }
  }

`;

const ImageSection = styled.img.attrs(() => ({
  src: "assets/suity.png",
  alt: "관심 키워드 설정 안내하는 슈티"
}))`
  width: 300px;

  // 모바일
  @media screen and (max-width: 480px) {
    width: 240px;
  }
`;

const InfoText = styled.p`
  ${spoqaMedium}
  text-align: center;
  color: var(--color-gray3);

  > span {
    ${spoqaMedium}
    display: block;
  }

  > a {
    ${spoqaMedium}
    display: block;
    margin-top: 4rem;
    text-decoration: underline;
    color: var(--color-orange);
  }

  // 데스크탑
  @media screen and (min-width: 480px) {
    ${spoqaLarge}
    margin-right: .8rem;

    > span {
      ${spoqaLarge}
    }
  }
`;

const SkeletonStyle = css`
  min-width: 305px;
  max-width: 688px;
  /* margin: 3em; */
  background-color: #e6e6e6;
  border-radius: 10px;
`;

const SkeletonCard = styled(Skeleton)`
  ${SkeletonStyle}
  padding: 1em;
  width: 400px;
  margin-top: 28px;

  // 모바일
  @media screen and (max-width: 480px) {
    width: 350px;
    margin-top: 35px;
  }
`;

const SkeletonTitle = styled(Skeleton)`
  ${SkeletonStyle}
  margin-top: 30px;
  width: 470px;

  // 모바일
  @media screen and (max-width: 480px) {
    width: 350px;
  }
`;

/* ------------------------------ card section ------------------------------ */
function CardSection({
  isLoading,
  cardData = {},
  currentTag = '',
  onClick,
  keywords = [],
}) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [question, setQuestion] = useState({});
  const handleDialog = async (id) => {
    const res = await API(`/api/questions/${id}`, "get");
    setQuestion(res);
  };

  if (!isLoading && !keywords.length) {
    return (
      <>
        <ImageSection />
        <InfoText>
          <span>관심 키워드를 설정하시면</span>
          분야별 질문을 보여드려요!
          <Link to="/info/my-info">관심 키워드 설정하러 가기</Link>
        </InfoText>
      </>
    );
  }

  return (
    <>
      <QnADialog
        isVisible={isDialogVisible}
        onClick={() => {
          setIsDialogVisible(false);
          setQuestion({});
        }}
        question={question}
      />
      <HashtagList>
        <li>
          <Hashtag
            type='All'
            isSelected={currentTag === 'All' ? true : false}
            isButton={true}
            clicked={onClick}
          />
        </li>
        {keywords.map(tag => (
            <li key={tag}>
              <Hashtag
                type={tag}
                isSelected={currentTag === tag ? true : false}
                isButton={true}
                clicked={onClick}
              />
            </li>
          ))}
      </HashtagList>
      <CardList>
        {cardData ? (isLoading ? (
          <>
            <SkeletonCard variant="rect" height="20em" />
            <SkeletonCard variant="rect" height="20em" />
            <SkeletonCard variant="rect" height="20em" />
          </>
        ) : (
          cardData.docs.map(data => (
            <li key={data._id}>
              <Card
                key={data._id}
                isQuestion={true}
                title={data.content}
                tags={data.hashTag}
                onClick={() => {
                  setIsDialogVisible(true);
                  handleDialog(data._id);
                }}
              >
                <QnAContent
                  answer={
                    // 빈 객체일 경우 false 전달
                    !!data.answers.length &&
                    data.answers.reduce(
                      (prev, curr) => {
                        if (curr.likes.length >= prev.likes.length) {
                          return curr;
                        }
                        return prev;
                      },
                      { likes: [] }
                    )
                  }
                />
              </Card>
            </li>
          )))
        ) : (
          <>
            <SkeletonCard variant="rect" height="20em" />
            <SkeletonCard variant="rect" height="20em" />
            <SkeletonCard variant="rect" height="20em" />
          </>
        )}
      </CardList>
    </>
  );
}

/* -------------------------------------------------------------------------- */
export default function FollowingPage() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.currentUser);
  const followingState = useSelector(state => state.following);
  const [currentTag, setCurrentTag] = useState(followingState.currentTag);
  const [prevTag, setPrevTag] = useState('All');
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    // App이 userState를 받아오기 전 바로 팔로잉페이지로 접근할 경우의
    // 에러를 방지하기 위해 분기 처리
    if (userState.currentUserData) setKeywords(userState.currentUserData[0].hashTag);
    setPrevTag(currentTag);
    dispatch(fetchFollowingData(keywords, currentTag, prevTag, followingState.isInitial));
    console.log(currentTag, prevTag);
  }, [dispatch, keywords, currentTag, userState.currentUserData]);

  const onClick = e => {
    setCurrentTag(e.target.title);
  };

  return (
    <>
      <TextHeaderBar page="follow" />
      <PageContainer
        page="follow"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        {userState.currentUserData ? (
          <CardSection
            isLoading={followingState.isLoading}
            cardData={followingState.followingData}
            currentTag={currentTag}
            onClick={onClick}
            keywords={keywords}
          />
        ) : (
          <>
            <SkeletonTitle variant="rect" height="2.8em" />
            <SkeletonCard variant="rect" height="20em" />
            <SkeletonCard variant="rect" height="20em" />
            <SkeletonCard variant="rect" height="20em" />
          </>
        )}
      </PageContainer>
    </>
  );
}
