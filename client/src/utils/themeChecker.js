export const themeChecker = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    console.log('dark');
    return 'dark';
  } else {
    console.log('light');
    return 'light';
  }
};
