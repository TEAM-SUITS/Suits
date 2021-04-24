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

StyledHardWorker.Image = styled.div`
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media screen and (min-width: 480px) {
    width: 120px;
    height: 120px;
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
  $onClick,
}) {
  return (
    <StyledHardWorker onClick={$onClick}>
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
