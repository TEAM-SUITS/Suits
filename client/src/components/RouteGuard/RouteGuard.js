import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouteGuard(props) {
  const { isAuthed } = useSelector((state) => state.auth);
  if (isAuthed) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
