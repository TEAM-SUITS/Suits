import axios from 'axios';
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
  spoqaMediumLight,
  spoqaSmall,
  spoqaSmallBold,
  boxShadowBlack,
} from 'styles/common/common.styled';
import API from 'api/api';

const StyledMyInfo = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  max-width: 568px;
  padding: 1em;

  .bio__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin-bottom: 2em;
    position: relative;
    .bio__heading-container {
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
    textarea {
      resize: none;
      ${spoqaMediumLight}
      font-size: 1.4rem;
      padding: 0.4em;
      height: 8em;
      letter-spacing: .5px;
      ${boxShadowBlack};
    }
    span {
      position: absolute;
      bottom: 1em;
      right: 1em;
      ${spoqaSmall}
      color: var(--color-gray3)
    }
  }

  .hashtag__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
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

  .button__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    button {
      padding: 0.5em;
      ${spoqaMedium}
      margin-bottom: 1em;
      color: var(--color-gray3);
      background-color: var(--color-lightgray2);
      border: none;
      ${boxShadowBlack};
      }
      .delete-account {
        background-color: var(--color-gray1);
        color: var(--color-red);
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
  @media screen and (min-width: 480px) {
    .bio__container {
      .bio__heading-container {
        h3 {
          font-size: 2rem;
        }
        button {
          font-size: 1.6rem;
        }
      }
      textarea {
        font-size: 2rem;
      }
    }
    .hashtag__container {
      .hashtag__heading-container {
        h3 {
          font-size: 2rem;
        }
        button {
          font-size: 1.6rem;
        }
      }
      .hashtag__hashtags {
        justify-content: center;
        * {
          font-size: 2rem;
          width: 140px;
          &:not(:last-child) {
            margin-right: 3rem;
          }
        }
      }
    }
    .button__container {
      button {
        font-size: 2rem;
      }
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
      width: 150px;
      height: 150px;
      margin-right: 5rem;
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
    @media screen and (min-width: 480px) {
      font-size: 3rem;
    }
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

export default function MyInfo() {
  const [user, setUser] = useState(null);
  const [isBioActive, setIsBioActive] = useState(false);
  const [enteredBio, setEnteredBio] = useState('');

  const dispatch = useDispatch();

  const getUser = async () => {
    const res = await axios.get('/api/user-profile');
    const userData = res.data[0];
    setUser(userData);
    setEnteredBio(userData.bio);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleBioChange = (e) => {
    setEnteredBio(e.target.value);
  };

  const handleHashtagChange = () => {
    console.log('changed hashtag!');
  };

  const handleClickBioButton = () => {
    if (isBioActive) {
      if (enteredBio === user.bio) {
        setIsBioActive(!isBioActive);
        return;
      }

      API('/api/user-profile/bio', 'patch', { bio: enteredBio });
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

  if (user) {
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
          <div className="bio__heading-container">
            <h3>자기소개</h3>
            <button onClick={handleClickBioButton}>
              {isBioActive ? '완료' : '수정'}
            </button>
          </div>
          <textarea
            disabled={!isBioActive}
            id="bio"
            value={enteredBio}
            onChange={(e) => handleBioChange(e)}
            maxLength="119"
          />
          <span>{enteredBio.length}/120</span>
        </div>
        <div className="hashtag__container">
          <div className="hashtag__heading-container">
            <h3>관심 키워드</h3>
            <button onClick={handleHashtagChange}>수정</button>
          </div>
          <div className="hashtag__hashtags">
            {user.hashTag.map((ht) => {
              return <Hashtag type={ht} />;
            })}
          </div>
        </div>
        <div className="button__container">
          <button className="signout" onClick={handleSignOut}>
            로그아웃
          </button>
          <button className="delete-account" onClick={handleDelete}>
            회원탈퇴
          </button>
        </div>
      </StyledMyInfo>
    );
  }

  return <p>스켈레톤 해야되나? 킹받네</p>;
}
