import axios from 'axios';

const themeToggler = async (theme, setTheme) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  try {
    await axios.patch('/api/user-profile/theme', { theme: newTheme });
    setTheme(newTheme);
  } catch (err) {
    console.error(err);
  }
};

export default themeToggler;
