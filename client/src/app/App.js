import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle } from "styles/pages/theme.styled";
import {
  HomePage,
  SearchPage,
  LikedPage,
  ProfilePage,
  InfoPage,
  PageNotFound,
} from "pages/Pages";
import Navigation from "containers/Nav/Navigation";
import QnAContent from "components/Content/QnAContent";
import Card from "components/Card/Card";

/* -------------------------------------------------------------------------- */

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      {/* <SignInDialog visible={!userName} /> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/liked" component={LikedPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
      <Navigation />
    </div>
  );
}

export default App;
