import React from "react";
import styled from "styled-components";
import { object, bool } from "prop-types";
import Tier from "components/Tier/Tier";
import Hashtag from "components/Hashtag/Hashtag";
import {
  museoLarge,
  spoqaMediumLight,
  spoqaSmall,
} from "styles/common/common.styled";
import Icon from "components/Icon/Icon";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton } from "@material-ui/lab";

const StyledProfile = styled.div`
  display: flex;
  position: relative;
  padding: 1.6em 1.6em 5em;
  width: 100%;
  justify-content: center;
  background-color: var(--color-white);

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 1.6em;
    @media screen and (min-width: 480px) {
      width: 150px;
      height: 150px;
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

const InfoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  h2 {
    ${museoLarge};
    margin: 0;
  }
`;

const TierContainer = styled.div`
  display: flex;
  align-items: center;
  .tier {
    width: 100px;
    margin-right: 1em;
  }
  .likes {
    width: 2em;
    margin-right: 0.5em;
    path {
      fill: var(--color-red);
    }
  }
  .likes-count {
    font-size: 1.8rem;
  }
`;

const StyledLink = styled(motion(Link))``;

/* ---------------------------- Skeleton UI --------------------------- */

const ProfileSkeletonImage = styled(Skeleton)`
  width: 100px !important;
  height: 100px !important;
  margin-right: 1.6em;
  @media screen and (min-width: 480px) {
    width: 150px !important;
    height: 150px !important;
  }
`;

const HashTagSkeleton = styled(Skeleton)`
  position: absolute;
  bottom: 2em;
  width: 5em;
`;

const ProfileSkeleton = (
  <StyledProfile>
    <ProfileSkeletonImage variant="circle" animation="wave" />
    <InfoContainer>
      <Skeleton variant="h2" animation="wave" />
      <TierContainer>
        <Skeleton className="tier" animation="wave" />
        <Skeleton className="likes" animation="wave" />
      </TierContainer>
      <Skeleton animation="wave" />
      <Skeleton varaiant="rect" animation="wave" height={50} />
    </InfoContainer>
    <HashTagSkeleton />
  </StyledProfile>
);

/* ---------------------------- styled components --------------------------- */

export default function Profile({ user, $isLoading }) {
  const { username, img, tier, hashtag, github, bio, like } = user;
  return user && !$isLoading ? (
    <StyledProfile>
      <img src={img} alt={username} />
      <InfoContainer>
        <h2>{username}</h2>
        <TierContainer>
          <Tier className="tier" tier={tier} />
          <Icon className="likes" type="heart-active" title="likes" />
          <span className="likes-count">{like}</span>
        </TierContainer>
        <a href={github}>{github}</a>
        {bio ? (
          <p>{bio}</p>
        ) : (
          <StyledLink whileHover={{ scale: 1.1 }} to="/info/my-info">
            소개말 등록
          </StyledLink>
        )}
      </InfoContainer>
      <div className="hashtags">
        {hashtag && hashtag.length !== 0 ? (
          hashtag.map((tag) => <Hashtag key={tag} type={tag} />)
        ) : (
          <StyledLink
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            to="/info/my-info"
          >
            <Hashtag isButton type="ETC">
              관심 태그 등록
            </Hashtag>
          </StyledLink>
        )}
      </div>
    </StyledProfile>
  ) : (
    ProfileSkeleton
  );
}

/* -------------------------------- propTypes ------------------------------- */

Profile.propTypes = {
  user: object.isRequired,
  $isLoading: bool,
};
