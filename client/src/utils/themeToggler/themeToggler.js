import axios from 'axios';

const themeToggler = async (theme, setTheme, displayError) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  try {
    await axios.patch('/api/user-profile/theme', { theme: newTheme });
    setTheme(newTheme);
  } catch (err) {
    displayError('테마 변경 중 문제가 발생했습니다.');
  }
};

export default themeToggler;
