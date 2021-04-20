import HardWorker from "components/HardWorker/HardWorker";
import React from "react";
import styled from "styled-components";
import { resetList } from "styles/common/common.styled";
import { array, bool } from "prop-types";
import { Skeleton } from "@material-ui/lab";

const HardWorkers = styled.ul`
  ${resetList}
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
`;

/* ---------------------------- styled components --------------------------- */

const HardWorkerSkeleton = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 25%;
`;

const HardWorkerSkeletonImage = styled(Skeleton)`
  width: 80px;
  height: auto;
  padding-top: 80px;
  margin-bottom: 0.5em;
  @media screen and (min-width: 480px) {
    width: 130px;
    padding-top: 130px;
    margin-bottom: 0.8em;
  }

  @media screen and (min-width: 768px) {
    width: 180px;
    padding-top: 180px;
    margin-bottom: 1em;
  }
`;

const HardWorkerSkeletonUsername = styled(Skeleton)`
  margin: 3px 0;
  width: 40%;
  padding-top: 1%;

  @media screen and (min-width: 480px) {
    padding-top: 5%;
  }
`;

const HardWorkerSkeletonTier = styled(Skeleton)`
  width: 60%;
  padding-top: 1%;

    @media screen and (min-width: 480px) {
      padding-top: 5%;

    }

  }
`;

const HardWorkersSkeleton = (
  <>
    <HardWorkerSkeleton>
      <HardWorkerSkeletonImage variant="circle" animation="wave" />
      <HardWorkerSkeletonUsername animation="wave" />
      <HardWorkerSkeletonTier animation="wave" />
    </HardWorkerSkeleton>
    <HardWorkerSkeleton>
      <HardWorkerSkeletonImage variant="circle" animation="wave" />
      <HardWorkerSkeletonUsername animation="wave" />
      <HardWorkerSkeletonTier animation="wave" />
    </HardWorkerSkeleton>
    <HardWorkerSkeleton>
      <HardWorkerSkeletonImage variant="circle" animation="wave" />
      <HardWorkerSkeletonUsername animation="wave" />
      <HardWorkerSkeletonTier animation="wave" />
    </HardWorkerSkeleton>
  </>
);

/* ----------------------------- skeleton ---------------------------- */

export default function HardWorkersContent({ users, $isLoading }) {
  const userItems =
    users && !$isLoading
      ? users.map(({ _id, username, avatar, tier }) => (
          <HardWorker
            key={_id}
            id={_id}
            username={username}
            img={avatar}
            tier={tier}
          />
        ))
      : HardWorkersSkeleton;

  return <HardWorkers>{userItems}</HardWorkers>;
}

/* -------------------------------- propTypes ------------------------------- */

HardWorkersContent.propTypes = {
  users: array,
  $isLoading: bool,
};
