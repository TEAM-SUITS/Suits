import React from "react";
import styled from "styled-components";
import { object } from "prop-types";
import Tier from "components/Tier/Tier";
import { museoMedium } from "styles/common/common.styled";
import { motion } from "framer-motion";

const StyledMiniProfile = styled(motion.div)`
  display: flex;
  min-width: 180px;
  cursor: ${({ isButton }) => (isButton ? "pointer" : "default")};

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    width: 60%;
    padding-bottom: 10px;
    span {
      ${museoMedium}
      margin: 5px 0;
    }
    img {
      width: 60px;
    }
  }

  @media screen and (min-width: 480px) {
    min-width: 250px;

    & > img {
      width: 80px;
      height: 80px;
    }
    div {
      img {
        width: 100px;
      }
    }
  }
`;

/* ---------------------------- styled components --------------------------- */

export default function MiniProfile({ user, isButton, onClick, onKeyDown }) {
  const { _id, username, avatar, tier } = user;
  return (
    <StyledMiniProfile
      whileHover={isButton && { scale: 1.1 }}
      isButton={isButton}
      onClick={isButton ? onClick : ""}
      onKeyDown={isButton ? onKeyDown : ""}
      role={isButton ? "button" : ""}
      aria-label={isButton ? "프로필 자세히 보기" : ""}
      tabIndex={isButton && 0}
      title={isButton ? "프로필 자세히 보기" : ""}
    >
      <img src={avatar} alt={username} />
      <div>
        <span>{username}</span>
        <Tier tier={tier} height={12} />
      </div>
    </StyledMiniProfile>
  );
}

/* -------------------------------- propTypes ------------------------------- */

MiniProfile.propTypes = {
  user: object.isRequired,
};
