import API from 'api/api';

const themeToggler = async (theme, setTheme) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  API('/api/user-profile/theme', 'patch', { theme: newTheme });
  setTheme(newTheme);
};

export default themeToggler;
