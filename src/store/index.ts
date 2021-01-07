import { combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import burgerReducer from "./burger/reducer";
import ordersReducer from "./orders/reducer";

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: ordersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: [reduxThunk],
    },
  }),
});

export * from "./types";
export default store;
