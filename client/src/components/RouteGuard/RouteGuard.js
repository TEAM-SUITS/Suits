import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouteGuard(props) {
  const { isAuthed } = useSelector((state) => state.auth);
  const currentLocation = useLocation().pathname;

  if (isAuthed) {
    return <Route {...props} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: currentLocation },
        }}
      />
    );
  }
}
