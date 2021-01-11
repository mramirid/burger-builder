import { combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import burgerReducer from "./reducers/burger";
import ordersReducer from "./reducers/orders";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: [reduxThunk],
    },
  }),
  devTools: process.env.NODE_ENV === "development",
});

export * from "./types";
export default store;
