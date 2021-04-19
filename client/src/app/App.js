import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { GlobalStyle } from "styles/pages/theme.styled";
import {
  HomePage,
  SearchPage,
  LikedPage,
  ProfilePage,
  InfoPage,
  UserPage,
  PageNotFound,
} from "pages/Pages";
import Navigation from "containers/Nav/Navigation";
import ProfileDialog from "containers/ProfileDialog/ProfileDialog";
import DemoPage from "pages/DemoPage/DemoPage";
import LoginPage from "pages/LoginPage/LoginPage";
import RouteGuard from "components/RouteGuard/RouteGuard";
import { useDispatch } from "react-redux";
import { fetchUserAction } from "redux/storage/auth/auth";

/* -------------------------------------------------------------------------- */
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  // 임시 state for Dialog
  const [checkingProfile, isCheckingProfile] = useState(false);

  return (
    <div className="App">
      <GlobalStyle />
      <ProfileDialog isVisible={checkingProfile} />
      <Switch>
        <RouteGuard path="/" exact component={HomePage} />
        <RouteGuard path="/demo" exact component={DemoPage} />
        <RouteGuard path="/search" component={SearchPage} />
        <RouteGuard path="/liked" component={LikedPage} />
        <RouteGuard path="/profile" component={ProfilePage} />
        <RouteGuard path="/info" component={InfoPage} />
        <RouteGuard path="user/my-info" component={UserPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
      {location.pathname === "/login" ? null : <Navigation />}
    </div>
  );
}

export default App;
