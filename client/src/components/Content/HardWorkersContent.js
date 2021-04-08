import HardWorker from 'components/HardWorker/HardWorker';
import React from 'react';
import styled from 'styled-components';
import { resetList } from 'styles/common/common.styled';
import { array } from 'prop-types';

const HardWorkers = styled.ul`
  ${resetList}
  display: flex;
  justify-content: space-around;
`;

/* ---------------------------- styled components --------------------------- */

export default function HardWorkersContent({ users }) {
  const userItems = users.map(({ id, username, img, tier }) => (
    <HardWorker key={id} username={username} img={img} tier={tier} />
  ));

  return <HardWorkers>{userItems}</HardWorkers>;
}

/* -------------------------------- propTypes ------------------------------- */

HardWorkersContent.propTypes = {
  users: array,
};
