import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import burgerReducer from "./burger/reducer";

const rootReducer = combineReducers({
  burger: burgerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
