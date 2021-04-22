import { useEffect, useState } from "react";
import styled from "styled-components";
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

// // 무한업데이트 방지
// let keywords = [];
// let cardData = {};

/* ------------------------------ card section ------------------------------ */
function CardSection({
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
    setIsDialogVisible(true);
  };

  if (!keywords.length) {
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
        onClick={() => setIsDialogVisible(false)}
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
        {cardData &&
          cardData.docs.map(data => (
            <li key={data._id}>
              <Card
                key={data._id}
                isQuestion={true}
                title={data.content}
                tags={data.hashTag}
                onClick={() => handleDialog(data._id)}
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
          ))}
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
  const [prevTag, setPrevTag] = useState(followingState.currentTag);
  const [keywords, setKeywords] = useState([]);

  // following 데이터 존재하는지 여부 확인
  // 존재 ? init 아니므로 기존 데이터 조회만 : init이므로 데이터 요청
  const [init, setInit] = useState(!followingState.followingData);

  useEffect(() => {
    // App이 userState를 받아오기 전 바로 팔로잉페이지로 접근할 경우의
    // 에러를 방지하기 위해 분기 처리
    if (userState.currentUserData) setKeywords(userState.currentUserData[0].hashTag);

    dispatch(fetchFollowingData(keywords, currentTag, prevTag, init));
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
        <CardSection
          cardData={followingState.followingData}
          currentTag={currentTag}
          onClick={onClick}
          keywords={keywords}
        />
      </PageContainer>
    </>
  );
}
