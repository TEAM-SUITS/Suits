import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
// import { Link } from 'react-router-dom';
import Tier from 'components/Tier/Tier';
import { museoMedium } from 'styles/common/common.styled';

const StyledMiniProfile = styled.div`
  display: flex;
  width: 250px;

  img {
    width: 80px;
    height: 80px;
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
    svg {
      width: 100px;
      height: fit-content;
    }
  }
`;

/* ---------------------------- styled components --------------------------- */

export default function MiniProfile({ user }) {
  const { id, username, img, tier } = user;
  return (
    <StyledMiniProfile>
      {/* 해당 id를 가진 유저의 프로필 페이지로 이동 */}
      {/* <Link> */}
      <img src={img} alt={username} />
      <div>
        <span>{username}</span>
        <Tier tier={tier} height="12px" />
      </div>
      {/* </Link> */}
    </StyledMiniProfile>
  );
}

/* -------------------------------- propTypes ------------------------------- */

MiniProfile.propTypes = {
  user: object.isRequired,
};
