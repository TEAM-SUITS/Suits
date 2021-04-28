import axios from 'axios';

const themeToggler = async (theme, setTheme) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  try {
    await axios.patch('/api/user-profile/theme', { theme: newTheme });
    setTheme(newTheme);
  } catch (err) {
    // dispatch(setError('테마를 변경하는 중 문제가 발생했습니다.'));
  }
};

export default themeToggler;
