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
  PostPage,
} from 'pages/Pages';
import Navigation from 'containers/Nav/Navigation';
import LoginPage from 'pages/LoginPage/LoginPage';
import RouteGuard from 'components/RouteGuard/RouteGuard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction } from 'redux/storage/auth/auth';
import { fetchCurrentUserData } from 'redux/storage/currentUser/currentUser';
import { ThemeProvider } from 'styled-components';
import ThemeToggler from '../components/ThemeToggler/ThemeToggler';
import { darkTheme, lightTheme } from 'styles/pages/Themes';
import themeToggler from 'utils/themeToggler/themeToggler';
import Alert from 'components/Alert/Alert';
import { hideError, setError } from 'redux/storage/error/error';

/* -------------------------------------------------------------------------- */
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUserData } = useSelector((state) => state.currentUser);
  // theme state (dark mode)
  const [theme, setTheme] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const displayError = (message) => {
    dispatch(setError(message));
  };

  const { error, isOpen } = useSelector((state) => state.error);
  const handleErrorClose = () => {
    dispatch(hideError());
  };
  // effects
  /** 참고
   * https://stackoverflow.com/questions/54002792/should-i-use-one-or-many-useeffect-in-component
   * https://ko.reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
   */
  useEffect(() => {
    dispatch(fetchUserAction());
    dispatch(fetchCurrentUserData());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUserData || typeof currentUserData[0] !== 'object') return;
    currentUserData[0].theme && setTheme(currentUserData[0].theme);
  }, [currentUserData]);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <div className="App">
        <GlobalStyle />
        {location.pathname === '/login' ? null : (
          <ThemeToggler handleClick={() => themeToggler(theme, setTheme, displayError)} />
        )}
        {isOpen && error && <Alert status="error" message={error} onClick={handleErrorClose} />}
        <Switch>
          <RouteGuard path="/" exact component={HomePage} />
          <RouteGuard path="/search" component={SearchPage} />
          <RouteGuard path="/follow" component={FollowingPage} />
          <RouteGuard path="/profile" component={ProfilePage} />
          <RouteGuard path="/info" component={InfoPage} />
          <RouteGuard path="user/my-info" component={UserPage} />
          <RouteGuard path="/post/:qid" component={PostPage} />
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
