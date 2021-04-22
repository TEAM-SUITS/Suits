import { useEffect, useState } from "react";
import styled from "styled-components";
import { resetList } from "styles/common/common.styled";
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

  @media screen and (max-width: 480px) {
    width: 340px;
  }
`;

/* -------------------------------------------------------------------------- */
export default function FollowingPage() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.currentUser);
  const followingState = useSelector(state => state.following);
  const [currentTag, setCurrentTag] = useState(followingState.currentTag);
  const [prevTag, setPrevTag] = useState(followingState.currentTag);
  const userData = userState.currentUserData[0];

  useEffect(() => {
    dispatch(fetchFollowingData(userData.hashTag, currentTag, prevTag));
  }, [dispatch, userData.hashTag, currentTag, prevTag]);

  const onClick = e => {
    setCurrentTag(e.target.title);
  };

  return (
    <>
      <TextHeaderBar page="liked" />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <StyledList>
          <li>
            <Hashtag
              type='All'
              isSelected={currentTag === 'All' ? true : false}
              isButton={true}
              clicked={onClick}
            />
          </li>
          {userData.hashTag &&
            userData.hashTag.map(tag => (
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
      </PageContainer>
    </>
  );
}
