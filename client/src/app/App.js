import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { GlobalStyle } from 'styles/pages/theme.styled';
import {
  HomePage,
  SearchPage,
  FollowingPage,
  ProfilePage,
  InfoPage,
  UserPage,
  PageNotFound,
} from 'pages/Pages';
import Navigation from 'containers/Nav/Navigation';
import ProfileDialog from 'containers/ProfileDialog/ProfileDialog';
import DemoPage from 'pages/DemoPage/DemoPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RouteGuard from 'components/RouteGuard/RouteGuard';
import { useDispatch } from 'react-redux';
import { fetchUserAction } from 'redux/storage/auth/auth';
import { fetchCurrentUserData } from 'redux/storage/currentUser/currentUser';
import { ThemeProvider } from 'styled-components';
import ThemeToggler from '../components/ThemeToggler/ThemeToggler';
import { darkTheme, lightTheme } from 'styles/pages/Themes';
import { themeChecker } from 'utils/themeChecker';

/* -------------------------------------------------------------------------- */
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // <dark mode>
  const [theme, setTheme] = useState(() => themeChecker());

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  // </dark mode>

  useEffect(() => {
    dispatch(fetchUserAction());
    dispatch(fetchCurrentUserData());
  }, [dispatch]);

  // 임시 state for Dialog
  const [checkingProfile, isCheckingProfile] = useState(false);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyle />
        <ThemeToggler handleClick={themeToggler} />
        <ProfileDialog isVisible={checkingProfile} />
        {/* <DemoPage /> */}
        <Switch>
          <RouteGuard path="/" exact component={HomePage} />
          <RouteGuard path="/demo" exact component={DemoPage} />
          <RouteGuard path="/search" component={SearchPage} />
          <RouteGuard path="/follow" component={FollowingPage} />
          <RouteGuard path="/profile" component={ProfilePage} />
          <RouteGuard path="/info" component={InfoPage} />
          <RouteGuard path="user/my-info" component={UserPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/page-not-found" component={PageNotFound} />
          <Redirect to="/page-not-found" />
        </Switch>
        {location.pathname === '/login' ? null : <Navigation />}
      </div>
    </ThemeProvider>
  );
}

export default App;
