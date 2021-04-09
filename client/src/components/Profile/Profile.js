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
  padding: 1.6em 1.6em 5em;
  max-width: 768px;

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
    svg {
      width: 100px;
      height: 18px;
      margin-right: 1em;
    }
    span {
      font-size: 1em;
    }
  }
  a {
    text-decoration: none;
    color: var(--color-gray3);
    ${spoqaSmall}
  }
  p {
    margin: .8em 0 0;
    ${spoqaMediumLight}
  }
  .hashtags {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
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
          <span>{like}</span>
        </div>
        <a href={github}>{github}</a>
        <p>{bio}</p>
      </div>
      <div className="hashtags">
        {hashtag.map((tag) => (
          <Hashtag key={tag} type={tag} />
        ))}
      </div>
    </StyledProfile>
  );
}

/* -------------------------------- propTypes ------------------------------- */

Profile.propTypes = {
  user: object.isRequired,
};
