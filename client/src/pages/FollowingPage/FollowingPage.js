import { useEffect, useState } from "react";
import styled from "styled-components";
import { resetList, spoqaMedium, spoqaLarge } from "styles/common/common.styled";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Hashtag from "components/Hashtag/Hashtag";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowingData } from "redux/storage/following/following";

/* ---------------------------- styled components --------------------------- */
const StyledList = styled.ul`
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

const ImageSection = styled.div`
  background: url("assets/suity.png") no-repeat center;
  background-size: contain;
  width: 300px;
  height: 340px;

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

  // 데스크탑
  @media screen and (min-width: 480px) {
    ${spoqaLarge}
    margin-right: .8rem;

    > span {
      ${spoqaLarge}
    }
  }
`;

/* ------------------------------ card section ------------------------------ */
function CardSection({
  currentTag = '',
  onClick,
  keywords = [],
}) {
  if (!keywords.length) {
    return (
      <>
        <ImageSection />
        <InfoText>
          <span>관심 키워드를 설정하시면</span>
          분야별 질문을 보여드려요!
        </InfoText>
      </>
    );
  }

  return (
    <StyledList>
      <li>
        <Hashtag
          type='All'
          isSelected={currentTag === 'All' ? true : false}
          isButton={true}
          clicked={onClick}
        />
      </li>
      {keywords &&
        keywords.map(tag => (
          <li key={tag}>
            <Hashtag
              type={tag}
              isSelected={currentTag === tag ? true : false}
              isButton={true}
              clicked={onClick}
            />
          </li>
        ))}
    </StyledList>
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
    else setKeywords([]);

    dispatch(fetchFollowingData(keywords, currentTag, prevTag, init));
  }, [dispatch, keywords, currentTag]);

  const onClick = e => {
    setCurrentTag(e.target.title);
  };

  return (
    <>
      <TextHeaderBar page="liked" />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <CardSection
          currentTag={currentTag}
          onClick={onClick}
          keywords={keywords}
        />
      </PageContainer>
    </>
  );
}
