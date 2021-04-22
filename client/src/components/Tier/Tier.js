import React from 'react';
import { oneOf } from 'prop-types';
import tier1 from './images/tier1.png';
import tier2 from './images/tier2.png';
import tier3 from './images/tier3.png';
import tier4 from './images/tier4.png';
import tier5 from './images/tier5.png';
import tier6 from './images/tier6.png';

export default function Tier({ tier = 1 }) {
  let src = null;
  switch (tier) {
    case 1:
      src = tier1;
      break;
    case 2:
      src = tier2;
      break;
    case 3:
      src = tier3;
      break;
    case 4:
      src = tier4;
      break;
    case 5:
      src = tier5;
      break;
    case 6:
      src = tier6;
      break;
    default:
      return;
  }
  return <img src={src} alt={'tier' + tier} />;
}

/* -------------------------------- proptypes ------------------------------- */

Tier.propTypes = {
  tier: oneOf([1, 2, 3, 4, 5, 6]),
};
