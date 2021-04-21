import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";
import { currentUserReducer } from "./currentUser/currentUser";
import { searchReducer } from "./search/search";

/* root reducer ------------------------------------------------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
