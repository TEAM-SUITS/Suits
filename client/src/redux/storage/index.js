import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";

/* root reducer ------------------------------------------------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
