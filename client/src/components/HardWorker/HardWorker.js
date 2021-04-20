import React from "react";
import styled from "styled-components";
import { museoSmall, textShadowBlack } from "styles/common/common.styled";
import { string, number } from "prop-types";
import Tier from "components/Tier/Tier";

const StyledHardWorker = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 25%;

  svg {
    height: 10px;
    @media screen and (min-width: 480px) {
      height: 15px;
    }

    @media screen and (min-width: 768px) {
      height: 20px;
    }
  }
`;

StyledHardWorker.Image = styled.div`
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media screen and (min-width: 480px) {
    width: 130px;
    height: 130px;
  }

  @media screen and (min-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

StyledHardWorker.Username = styled.h3`
  margin: 3px 0;
  ${museoSmall};
  ${textShadowBlack};

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
  img = "https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg",
  username = "username",
  tier = 1,
}) {
  const goToProfile = (id) => {
    console.log(id + "을 아이디로 가진 유저의 프로필 페이지로 이동");
  };

  return (
    <StyledHardWorker onClick={() => goToProfile(id)}>
      <StyledHardWorker.Image img={img} role="img" aria-label={username} />
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
