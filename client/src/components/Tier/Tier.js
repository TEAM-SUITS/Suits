import React from 'react';
import { number, oneOf } from 'prop-types';
import { ReactComponent as Tier1 } from './images/tier1.svg';
import { ReactComponent as Tier2 } from './images/tier2.svg';
import { ReactComponent as Tier3 } from './images/tier3.svg';
import { ReactComponent as Tier4 } from './images/tier4.svg';
import { ReactComponent as Tier5 } from './images/tier5.svg';
import { ReactComponent as Tier6 } from './images/tier6.svg';

export default function Tier({ tier = 1, height = 10 }) {
  let COMP = null;
  switch (tier) {
    case 1:
      COMP = Tier1;
      break;
    case 2:
      COMP = Tier2;
      break;
    case 3:
      COMP = Tier3;
      break;
    case 4:
      COMP = Tier4;
      break;
    case 5:
      COMP = Tier5;
      break;
    case 6:
      COMP = Tier6;
      break;
    default:
      return;
  }
  return <COMP height={`${height}px`} />;
}

/* -------------------------------- proptypes ------------------------------- */

Tier.propTypes = {
  tier: oneOf([1, 2, 3, 4, 5, 6]),
  height: number,
};
