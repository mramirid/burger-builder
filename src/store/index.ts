import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

import burgerReducer from "./burger/reducer";

const rootReducer = combineReducers({
  burger: burgerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(thunk),
});

export default store;
