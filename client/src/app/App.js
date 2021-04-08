import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle } from "styles/pages/theme.styled";
import "./App.scss";
import {
  HomePage,
  SearchPage,
  LikedPage,
  ProfilePage,
  InfoPage,
  PageNotFound,
} from "pages/Pages";
import Card from "components/Card/Card";
import QuotesContent from "components/Content/QuotesContent";

/* -------------------------------------------------------------------------- */

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Card title="제목은 주자">
        <QuotesContent title="Wisdome of the day">
          <QuotesContent author="Bertrand Russell">
            To teach how to live without certainty, and yet without being
            paralyzed by hesitation, is perhaps the chief thing that philosophy,
            in our age, can still do for those who study it.
          </QuotesContent>
        </QuotesContent>
      </Card>
      {/* <HomeLogoLink />
      <Navigation /> */}
      {/* <SignInDialog visible={!userName} /> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/post" component={LikedPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
    </div>
  );
}

export default App;
