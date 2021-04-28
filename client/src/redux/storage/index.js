import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";
import { currentUserReducer } from "./currentUser/currentUser";
import { searchReducer } from "./search/search";
import { hardWorkersReducer } from "./hardWorkers/hardWorkers";
import { trendingQReducer } from "./trendingQ/trendingQ";
import { quoteReducer } from "./quote/quote";
import { randomQReducer } from "./randomQ/randomQ";
import { followingReducer } from "./following/following";
import { errorReducer } from "./error/error";
import { currentQuestionReducer } from "redux/post/post";

/* root reducer ------------------------------------------------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  currentUser: currentUserReducer,
  hardWorkers: hardWorkersReducer,
  trendingQ: trendingQReducer,
  quote: quoteReducer,
  randomQ: randomQReducer,
  following: followingReducer,
  error: errorReducer,
  currentQuestion: currentQuestionReducer,
});

export default rootReducer;
