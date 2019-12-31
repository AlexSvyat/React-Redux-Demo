// Root Redux Reducer that combine all the reducers together
// to be passed to a Redux Store during configuration

import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({ courses, authors, apiCallsInProgress });

export default rootReducer;
