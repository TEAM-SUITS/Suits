import Hashtag from 'components/Hashtag/Hashtag';
import Icon from 'components/Icon/Icon';
import Tier from 'components/Tier/Tier';
import React, { useState, useEffect } from 'react';
import { signOutAction } from 'redux/storage/auth/auth';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  museoLarge,
  spoqaMedium,
  spoqaSmall,
  spoqaSmallBold,
  boxShadow,
  resetBoxModel,
} from 'styles/common/common.styled';
import API from 'api/api';
import KeywordSelect from 'components/KeywordSelect/KeywordSelect';
import { useSelector } from 'react-redux';
import { fetchCurrentUserData } from 'redux/storage/currentUser/currentUser';
import { ReactComponent as Spinner } from '../Spinner/Spinner.svg';
import AlertDialog from 'containers/AlertDialog/AlertDialog';

/* -------------------------------------------------------------------------- */

const StyledMyInfo = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 568px;
  padding: 1em;
  margin-top: 60px;
  @media screen and (min-width: 480px) {
    textarea {
      font-size: 2rem;
    }
  }
`;

const StyledBio = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin-bottom: 2em;
  position: relative;
  textarea {
    resize: none;
    ${spoqaMedium}
    font-size: 1.4rem;
    padding: 0.4em;
    height: 8em;
    letter-spacing: 0.5px;
    ${boxShadow}
    &:disabled {
      background-color: var(--color-gray2);
    }
  }
  span {
    position: absolute;
    bottom: 1em;
    right: 1em;
    ${spoqaSmall}
    color: var(--color-gray5)
  }
`;

const StyledBioHeading = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1em;
  h3 {
    ${spoqaMedium}
    margin: 0 .5em 0 0;
  }
  button {
    ${spoqaSmallBold};
    color: var(--color-gray4);
    border: 1px solid var(--color-gray4);
    background-color: transparent;
  }
  @media screen and (min-width: 480px) {
    h3 {
      font-size: 1.8rem;
    }
    button {
      font-size: 1.4rem;
    }
  }
`;

const StyledHashtagContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin-bottom: 3em;
`;

const StyledHashtagHeadingContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1em;
  h3 {
    ${spoqaMedium}
    margin: 0 .5em 0 0;
  }
  button {
    ${spoqaSmallBold};
    color: var(--color-gray4);
    border: 1px solid var(--color-gray4);
    background-color: transparent;
  }

  @media screen and (min-width: 480px) {
    h3 {
      font-size: 1.8rem;
    }
    button {
      font-size: 1.4rem;
    }
  }
`;

const StyledHashtags = styled.div`
  display: flex;
  justify-content: space-around;
  @media screen and (min-width: 480px) {
    div {
      font-size: 1.6rem;
      width: 120px;
      &:not(:last-child) {
        margin-right: 2em;
      }
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  button {
    padding: 0.5em;
    ${spoqaMedium}
    border: none;
    ${boxShadow};
  }
`;

const StyledSignoutButton = styled.button`
  color: var(--color-black);
  background-color: var(--color-gray2);
  margin-bottom: 1em;
`;

const StyledDeleteButton = styled.button`
  background-color: var(--color-gray1);
  border: 1px solid var(--color-gray2);
  color: var(--color-red);
`;

const StyledProfile = styled.div`
  display: flex;
  position: relative;
  padding: 1.6em;
  max-width: 500px;
  @media screen and (min-width: 480px) {
    padding-bottom: 4em;
  }
  & > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 3em;
    @media screen and (min-width: 480px) {
      width: 120px;
      height: 120px;
      margin-right: 5rem;
    }
  }
  .info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  p {
    ${museoLarge};
    margin: 0;
    @media screen and (min-width: 480px) {
    }
  }
  .tierContainer {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      margin-right: 1em;
    }
    svg {
      width: 2em;
      margin-right: 0.5em;
      path {
        fill: var(--color-red);
      }
    }
    span {
      font-size: 1.6rem;
    }
  }
  a {
    text-decoration: none;
    color: var(--color-gray5);
    ${spoqaSmall}
  }
`;

const StyledConfirmAlert = styled.div`
  background-color: var(--color-body);
  border: 2px solid var(--color-gray5);
  border-radius: 10px;
  padding: 2em 3em 1.5em;
  ${boxShadow}
  h1 {
    font-size: 1.8rem;
    text-align: center;
    margin: 0;
    color: var(--color-text);
  }
  p {
    font-size: 1.6rem;
    color: var(--color-text);
    margin-bottom: 2em;
  }
  div {
    display: flex;
    justify-content: center;
    button {
      font-size: 1.4rem;
      border: none;
      border: 1px solid var(--color-gray5);
      border-radius: 5px;
      background-color: var(--color-gray2);
      padding: 0.5em 2em;
      ${boxShadow}
      ${spoqaMedium}
      &:last-child {
        color: var(--color-red);
        margin-left: 3em;
        font-weight: bold;
      }
    }
  }
  @media screen and (min-width: 480px) {
    padding: 5em 6em 4em;
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 2rem;
    }
    button {
      font-size: 2rem;
    }
  }
`;

const Loading = styled.p`
  ${resetBoxModel};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
`;

/* ---------------------------- styled components --------------------------- */

export default function MyInfo() {
  const [isBioActive, setIsBioActive] = useState(false);
  const [enteredBio, setEnteredBio] = useState('');
  const [isSelectingKeywords, setIsSelectingKeywords] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();

  let user = null;

  const { currentUserData, isLoading } = useSelector(
    (state) => state.currentUser
  );

  useEffect(() => {
    if (user) setEnteredBio(user.bio);
  }, [user, currentUserData]);

  if (isLoading) {
    return (
      <Loading>
        <Spinner />
      </Loading>
    );
  }

  user = currentUserData[0];

  const handleBioChange = (e) => {
    setEnteredBio(e.target.value);
  };

  const handleOpenHashtagChange = () => {
    setIsSelectingKeywords(true);
  };

  const handleCloseHashtagChange = () => {
    setIsSelectingKeywords(false);
  };

  const handleClickBioButton = async () => {
    if (isBioActive && user.bio !== enteredBio) {
      await API('/api/user-profile/bio', 'patch', { bio: enteredBio });
      dispatch(fetchCurrentUserData());
    }
    setIsBioActive(!isBioActive);
  };

  const handleSignOut = () => {
    dispatch(signOutAction());
  };

  const handleDelete = async () => {
    await API('/api/user', 'delete');
    dispatch(signOutAction());
  };

  return (
    <>
      {isSelectingKeywords && (
        <KeywordSelect
          userKeywords={user.hashTag}
          onClose={handleCloseHashtagChange}
        />
      )}
      <AlertDialog
        isVisible={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onClick={() => setIsDeleting(false)}
        onConfirm={handleDelete}
      />

      <StyledMyInfo>
        <StyledProfile>
          <img src={user.avatar} alt={user.username} />
          <div className="info">
            <p>{user.username}</p>
            <div className="tierContainer">
              <Tier tier={user.tier} />
              <Icon type="heart-active" title="likes" />
              <span>{user.likeCount}</span>
            </div>
            <a href={user.githubRepo}>{user.githubRepo}</a>
          </div>
        </StyledProfile>
        <StyledBio>
          <StyledBioHeading>
            <h3>자기소개</h3>
            <button onClick={handleClickBioButton}>
              {isBioActive ? '완료' : '수정'}
            </button>
          </StyledBioHeading>
          <textarea
            disabled={!isBioActive}
            id="bio"
            value={enteredBio}
            onChange={(e) => handleBioChange(e)}
            maxLength="119"
          />
          {isBioActive && <span>{enteredBio.length}/120</span>}
        </StyledBio>
        <StyledHashtagContainer>
          <StyledHashtagHeadingContainer>
            <h3>관심 키워드</h3>
            <button onClick={handleOpenHashtagChange}>수정</button>
          </StyledHashtagHeadingContainer>
          <StyledHashtags>
            {user.hashTag.length ? (
              user.hashTag.map((ht) => {
                return <Hashtag key={ht} type={ht} />;
              })
            ) : (
              <img
                src="/assets/keyword.png"
                alt="슈티 : 관심 키워드를 설정해보세요"
              />
            )}
          </StyledHashtags>
        </StyledHashtagContainer>
        <StyledButtonContainer>
          <StyledSignoutButton onClick={handleSignOut}>
            로그아웃
          </StyledSignoutButton>
          <StyledDeleteButton onClick={() => setIsDeleting(true)}>
            회원탈퇴
          </StyledDeleteButton>
        </StyledButtonContainer>
      </StyledMyInfo>
    </>
  );
}
