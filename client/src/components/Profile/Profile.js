import React from 'react';
import styled from 'styled-components';
import { object, bool } from 'prop-types';
import Tier from 'components/Tier/Tier';
import Hashtag from 'components/Hashtag/Hashtag';
import { museoLarge, spoqaMedium, spoqaMediumLight, spoqaSmall } from 'styles/common/common.styled';
import Icon from 'components/Icon/Icon';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';

const StyledProfile = styled.div`
  display: flex;
  flex-flow: wrap;
  position: relative;
  min-height: 250px;
  padding: 3.5em 1.6em 1em;
  width: 100%;
  justify-content: center;
  background-color: var(--color-body);

  @media screen and (min-width: 640px) {
    width: 30em;
    margin-right: 3em;
    margin: 0 auto;
  }
  @media screen and (max-width: 480px) {
    padding-top: 5em;
  }

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    @media screen and (min-width: 481px) {
      width: 150px;
      height: 150px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 0;
      margin-right: 0;
    }
    @media screen and (min-width: 350px) and (max-width: 639px) {
      margin-right: 1.6em;
    }
  }

  a {
    text-decoration: none;
    color: var(--color-gray5);
    ${spoqaSmall}
  }

  p {
    ${spoqaMediumLight}
    max-width: 200px;
  }

  .hashtags {
    min-width: 250px;
    height: 2em;
    margin: 2em 0;
    display: flex;
    justify-content: space-around;
  }

  .no-tag {
    width: 220px;
    margin-bottom: 1em;
    color: var(--color-gray);
    em {
      ${spoqaMedium}
      font-weight: bold;
    }
  }
  .no-bio {
    margin: 0.8em 0;
    font-size: 1.4rem;
    width: 140px;
    em {
      ${spoqaSmall}
      font-weight: bold;
    }
  }
`;

const InfoContainer = styled.div`
  min-width: 220px;
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
  margin-right: 1.6em;
  margin-bottom: 1em;
  width: 100px !important;
  height: 100px !important;
  @media screen and (min-width: 481px) {
    width: 150px !important;
    height: 150px !important;
    margin-right: 0;
  }
  @media screen and (min-width: 350px) and (max-width: 639px) {
    margin-right: 1.6em;
  }
`;

const HashTagSkeleton = styled(Skeleton)`
  min-width: 250px !important;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const ProfileSkeleton = (
  <StyledProfile>
    <ProfileSkeletonImage variant="circle" animation="wave" />
    <InfoContainer>
      <Skeleton variant="text" animation="wave" />
      <TierContainer>
        <Skeleton className="tier" animation="wave" />
        <Skeleton className="likes" animation="wave" />
      </TierContainer>
      <Skeleton animation="wave" />
      <Skeleton varaiant="rect" animation="wave" height={50} />
    </InfoContainer>
    <HashTagSkeleton className="hashtags" />
  </StyledProfile>
);
/* ---------------------------- styled components --------------------------- */

export default function Profile({ user, $isLoading, ...restProps }) {
  const { currentUserData } = useSelector((state) => state.currentUser);

  const { _id, username, img, tier, hashtag, github, bio, like } = user;

  const renderBio = () => {
    if (bio) return <p>{bio}</p>;
    else if (!bio && currentUserData && currentUserData[0]._id === _id) {
      return (
        <StyledLink className="no-bio" whileHover={{ scale: 1.1 }} to="/info/my-info">
          소개말 등록
        </StyledLink>
      );
    } else {
      return (
        <p className="no-bio">
          <em>프로필 소개</em>를 등록하지 않은 유저입니다
        </p>
      );
    }
  };

  const renderHashTag = () => {
    if (hashtag && hashtag.length !== 0)
      return (
        <div className="hashtags">
          {hashtag.map((tag) => (
            <Hashtag key={tag} type={tag} />
          ))}
        </div>
      );
    else if (hashtag.length === 0 && currentUserData[0]._id === _id) {
      return (
        <StyledLink className="no-tag" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} to="/info/my-info">
          <Hashtag isButton type="ETC">
            관심 태그 등록
          </Hashtag>
        </StyledLink>
      );
    } else
      return (
        <p className="no-tag">
          <em>관심 태그</em>를 등록하지 않은 유저입니다
        </p>
      );
  };

  return !user || $isLoading ? (
    ProfileSkeleton
  ) : (
    <StyledProfile {...restProps}>
      <img src={img} alt={username} />
      <InfoContainer>
        <h2>{username}</h2>
        <TierContainer>
          <Tier className="tier" tier={tier} height={20} />
          <Icon className="likes" type="heart-active" title="likes" />
          <span className="likes-count">{like}</span>
        </TierContainer>
        <a href={github}>{github}</a>
        {renderBio()}
      </InfoContainer>
      {renderHashTag()}
    </StyledProfile>
  );
}

/* -------------------------------- propTypes ------------------------------- */

Profile.propTypes = {
  user: object,
  $isLoading: bool,
};
