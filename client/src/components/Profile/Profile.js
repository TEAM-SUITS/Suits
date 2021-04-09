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

const StyledProfile = styled.div`
  display: flex;
  position: relative;
  padding: 16px 16px 50px;
  max-width: 768px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 16px;
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
    svg {
      width: 100px;
      height: 18px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
    }
  }
  a {
    text-decoration: none;
    color: var(--color-gray3);
    ${spoqaSmall}
  }
  p {
    margin: 8px 0 0;
    ${spoqaMediumLight}
  }
  .hashtags {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
    * {
      margin-right: 50px;
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
          <span>{like}</span>
        </div>
        <a href={github}>{github}</a>
        <p>{bio}</p>
      </div>
      <div className="hashtags">
        {hashtag.map((tag) => (
          <Hashtag type={tag} />
        ))}
      </div>
    </StyledProfile>
  );
}

/* -------------------------------- propTypes ------------------------------- */

Profile.propTypes = {
  user: object.isRequired,
};
