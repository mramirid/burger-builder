import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";
import produce from "immer";

import { BurgerBuilder } from "./BurgerBuilder";
import { AppDispatch, RootState } from "../../store";
import { initialState as burgerInitialState } from "../../store/reducers/burger";
import { initialState as authInitialState } from "../../store/reducers/auth";
import { initialState as ordersInitialState } from "../../store/reducers/orders";

const initialRootState: RootState = {
  burger: burgerInitialState,
  auth: authInitialState,
  orders: ordersInitialState,
};

const mockStore = configureMockStore<RootState, AppDispatch>(
  getDefaultMiddleware()
);

describe.only("<BurgerBuilder />", () => {
  it("Should render <BuildControls /> when receiving ingredient counts", () => {
    const store = mockStore(
      produce(initialRootState, (initRootStateDraft) => {
        initRootStateDraft.burger.ingredientCounts = {
          breadTop: 1,
          bacon: 0,
          cheese: 0,
          meat: 0,
          salad: 0,
          breadBottom: 1,
        };
      })
    );

    render(
      <Provider store={store}>
        <BurgerBuilder />
      </Provider>
    );

    expect(screen.getAllByText(/MORE/)).toHaveLength(4);
    expect(screen.getAllByText(/LESS/)).toHaveLength(4);
  });
});
