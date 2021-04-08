import React from 'react';
import { number, oneOf } from 'prop-types';
import { ReactComponent as Tier1 } from './images/tier1.svg';
import { ReactComponent as Tier2 } from './images/tier2.svg';
import { ReactComponent as Tier3 } from './images/tier3.svg';
import { ReactComponent as Tier4 } from './images/tier4.svg';
import { ReactComponent as Tier5 } from './images/tier5.svg';
import { ReactComponent as Tier6 } from './images/tier6.svg';

export default function Tier({ tier = 1, width = 100 }) {
  let Tier = null;
  switch (tier) {
    case 1:
      Tier = Tier1;
      break;
    case 2:
      Tier = Tier2;
      break;
    case 3:
      Tier = Tier3;
      break;
    case 4:
      Tier = Tier4;
      break;
    case 5:
      Tier = Tier5;
      break;
    case 6:
      Tier = Tier6;
      break;
    default:
      return;
  }
  return <Tier width={`${width}px`} />;
}

/* -------------------------------- proptypes ------------------------------- */

Tier.propTypes = {
  tier: oneOf([1, 2, 3, 4, 5, 6]),
  width: number,
};
