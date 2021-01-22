import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === "development",
});

sagaMiddleware.run(rootSaga);

export * from "./types";
export default store;
