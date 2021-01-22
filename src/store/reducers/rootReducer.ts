import { combineReducers } from "redux";

import burgerReducer from "./burger";
import ordersReducer from "./orders";
import authReducer from "./auth";

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export default rootReducer;
