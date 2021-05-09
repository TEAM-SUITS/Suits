const getHashTagColor = (type) => {
  let theme = '';
  switch (type) {
    case 'All':
      theme = '--color-text';
      break;
    case 'CSS':
      theme = '--color-blue1';
      break;
    case 'JavaScript':
      theme = '--color-yellow';
      break;
    case 'OS':
      theme = '--color-green1';
      break;
    case 'Database':
      theme = '--color-purple';
      break;
    case 'Network':
      theme = '--color-blue2';
      break;
    case 'Front-End':
      theme = '--color-green2';
      break;
    case 'Back-End':
      theme = '--color-orange2';
      break;
    case 'ETC':
      theme = '--color-gray2';
      break;
    default:
      break;
  }
  return theme;
};

export default getHashTagColor;
