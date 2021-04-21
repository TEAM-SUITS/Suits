import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import Tier from 'components/Tier/Tier';
import Hashtag from 'components/Hashtag/Hashtag';
import {
  museoLarge,
  spoqaMediumLight,
  spoqaSmall,
} from 'styles/common/common.styled';
import Icon from 'components/Icon/Icon';
import { Link } from 'react-router-dom';

const StyledProfile = styled.div`
  display: flex;
  position: relative;
  padding: 1.6em 1.6em 5em;
  width: 100%;
  justify-content: center;
  background-color: var(--color-white);

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 1.6em;
    @media screen and (min-width: 480px) {
      width: 150px;
      height: 150px;
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
  p {
    margin: 0.8em 0;
    ${spoqaMediumLight}
  }
  .hashtags {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 2em;
    width: 100%;
    * {
      margin-right: 5%;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

/* ---------------------------- styled components --------------------------- */

export default function Profile({ user }) {
  const { username, img, tier, hashtag, github, bio, like } = user;
  return (
    <StyledProfile>
      <img src={img} alt={username} />
      <div className="info">
        <h2>{username}</h2>
        <div className="tierContainer">
          <Tier tier={tier} />
          <Icon type="heart-active" title="likes" />
          <span>{like}</span>
        </div>
        <a href={github}>{github}</a>
        {bio ? <p>{bio}</p> : <Link to="/info/my-info">소개말 등록</Link>}
      </div>
      <div className="hashtags">
        {hashtag.length !== 0 ? (
          hashtag.map((tag) => (
            <Hashtag key={tag} type={tag} isSelected={true} />
          ))
        ) : (
          <Link to="/info/my-info">관심 태그 등록</Link>
        )}
      </div>
    </StyledProfile>
  );
}

/* -------------------------------- propTypes ------------------------------- */

Profile.propTypes = {
  user: object.isRequired,
};
