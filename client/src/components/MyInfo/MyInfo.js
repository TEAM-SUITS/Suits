import Hashtag from 'components/Hashtag/Hashtag';
import Icon from 'components/Icon/Icon';
import Tier from 'components/Tier/Tier';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  museoLarge,
  spoqaMedium,
  spoqaMediumLight,
  spoqaSmall,
  spoqaSmallBold,
} from 'styles/common/common.styled';

const StyledMyInfo = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 0 2em;

  .bio__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    max-width: 400px;
    margin-bottom: 2em;
    h3 {
      ${spoqaMedium}
      margin: 0 0 .6em 0;
    }
    textarea {
      resize: none;
      ${spoqaMediumLight}
      font-size: 1.4rem;
      padding: 0.4em;
      height: 8em;
    }
  }

  .hashtag__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    max-width: 400px;
    margin-bottom: 3em;
    .hashtag__heading-container {
      display: flex;
      align-items: flex-end;
      margin-bottom: 1em;
      h3 {
        ${spoqaMedium}
        margin: 0 .5em 0 0;
      }
      button {
        ${spoqaSmallBold};
        color: var(--color-gray2);
        border: 1px solid var(--color-gray2);
        background-color: transparent;
      }
    }
    .hashtag__hashtags {
      display: flex;
      justify-content: space-around;
    }
  }

  @media screen and (min-width: 480px) {
    textarea {
      font-size: 1.6rem;
    }
  }

  .button__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    max-width: 400px;

    button {
      padding: 0.5em;
      ${spoqaMedium}
      &:not(:last-child) {
        margin-bottom: 1em;
        color: var(--color-gray3);
      }
      &:not(:first-child) {
        border: none;
        background-color: var(--color-gray1);
      }
    }
    .update {
      border: 2px solid var(--color-gray1);
      background-color: transparent;
    }
    .delete-account {
      color: var(--color-red);
    }
  }
`;

const StyledProfile = styled.div`
  display: flex;
  position: relative;
  padding: 1.6em;
  max-width: 500px;
  @media screen and (min-width: 480px) {
    padding-bottom: 4em;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 3em;
    @media screen and (min-width: 480px) {
      width: 120px;
      height: 120px;
    }
  }
  .info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  h2 {
    ${museoLarge};
    margin: 0;
  }
  .tierContainer {
    display: flex;
    align-items: center;
    svg:first-child {
      width: 100px;
      height: 18px;
      margin-right: 1em;
    }
    svg:last-of-type {
      width: 2em;
      margin-right: 0.5em;
      path {
        fill: var(--color-red);
      }
    }
    span {
      font-size: 1.8rem;
    }
  }
  a {
    text-decoration: none;
    color: var(--color-gray3);
    ${spoqaSmall}
  }
`;

export default function MyInfo({ user }) {
  const [userInfo, setUserInfo] = useState({
    bio: user.bio,
    hashtag: user.hashTag,
  });

  const handleBioChange = (e) => {
    const editedBio = e.target.value;
    setUserInfo((prev) => ({ ...prev, bio: editedBio }));
  };
  return (
    <StyledMyInfo>
      <StyledProfile>
        <img src={user.avatar} alt={user.username} />
        <div className="info">
          <h2>{user.username}</h2>
          <div className="tierContainer">
            <Tier tier={user.tier} />
            <Icon type="heart-active" title="likes" />
            <span>{user.likeCount}</span>
          </div>
          <a href={user.githubRepo}>{user.githubRepo}</a>
        </div>
      </StyledProfile>
      <div className="bio__container">
        <h3>자기소개 (80자 이하)</h3>
        <textarea
          id="bio"
          value={userInfo.bio}
          onChange={(e) => handleBioChange(e)}
          maxlength="80"
        />
      </div>
      <div className="hashtag__container">
        <div className="hashtag__heading-container">
          <h3>관심 키워드</h3>
          <button>수정</button>
        </div>
        <div className="hashtag__hashtags">
          {userInfo.hashtag.map((ht) => {
            return <Hashtag type={ht} />;
          })}
        </div>
      </div>
      <div className="button__container">
        <button className="update">수정하기</button>
        <button className="signout">로그아웃</button>
        <button className="delete-account">회원탈퇴</button>
      </div>
    </StyledMyInfo>
  );
}
