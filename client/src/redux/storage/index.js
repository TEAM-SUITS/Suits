import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";
import { searchReducer } from "./search/search";

/* root reducer ------------------------------------------------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
});

export default rootReducer;
