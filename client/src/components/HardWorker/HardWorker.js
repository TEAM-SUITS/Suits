import React from 'react';
import styled, { css } from 'styled-components';
import { museoSmall, textShadow, spoqaSmallBold } from 'styles/common/common.styled';
import { string, number } from 'prop-types';
import Tier from 'components/Tier/Tier';
import { motion } from 'framer-motion';
import { hoverMotion } from 'styles/motions/variants';
import Icon from 'components/Icon/Icon';

const StyledHardWorker = styled(motion.div).attrs(() => ({
  role: 'button',
  ariaLabel: '유저 프로필 자세히 보기',
  title: '유저 프로필 자세히 보기',
}))`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 80px;
    @media screen and (min-width: 480px) {
      width: 100px;
    }

    @media screen and (min-width: 768px) {
      width: 120px;
    }
  }
`;

const imageStyles = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media screen and (min-width: 480px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

StyledHardWorker.ImageContainer = styled(motion.div)`
  position: relative;
`;

StyledHardWorker.Image = styled.div`
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  ${imageStyles}
`;

StyledHardWorker.ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  opacity: 0;
  background-color: #f0f0f099;
  ${imageStyles}
`;

StyledHardWorker.IconContainer = styled.div`
  padding: 0;
  margin: 0;
  font-size: 1.6rem;

  @media screen and (min-width: 480px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  svg {
    path {
      fill: var(--color-red);
    }
  }
  span {
    ${spoqaSmallBold};
    color: var(--color-red);
  }
`;

StyledHardWorker.Username = styled.h3`
  margin: 3px 0;
  ${museoSmall};
  ${textShadow};

  @media screen and (min-width: 480px) {
    font-size: 1.8rem;
  }
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

/* ---------------------------- styled components --------------------------- */

export default function HardWorker({
  id,
  img = 'https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg',
  username = 'username',
  tier = 1,
  likeCount,
  $onClick,
}) {
  return (
    <StyledHardWorker initial="rest" whileHover="hover" animate="rest" onClick={$onClick}>
      <StyledHardWorker.ImageContainer>
        <StyledHardWorker.Image img={img} role="img" aria-label={username} />
        <StyledHardWorker.ImageOverlay variants={hoverMotion}>
          <StyledHardWorker.IconContainer>
            <Icon type="heart-active" title="누적 좋아요" />
            <span>+{likeCount}</span>
          </StyledHardWorker.IconContainer>
        </StyledHardWorker.ImageOverlay>
      </StyledHardWorker.ImageContainer>
      <StyledHardWorker.Username>{username}</StyledHardWorker.Username>
      <Tier tier={tier} />
    </StyledHardWorker>
  );
}

/* -------------------------------- proptypes ------------------------------- */

HardWorker.propTypes = {
  id: string,
  img: string,
  username: string,
  tier: number,
};
