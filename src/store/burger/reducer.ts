import { createReducer } from "@reduxjs/toolkit";

import { BurgerState } from "./types";
import { incrementIngredient, decrementIngredient } from "./actions";
import { INGREDIENT_PRICES } from "../../shared/constants/burger";

/*
 * State
 */
const initialState: BurgerState = {
  ingredientCounts: {
    breadTop: 1,
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
    breadBottom: 1,
  },
  totalPrice: 4.0,
};

/*
 * Reducer
 */
const burgerReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(incrementIngredient, (state, action) => {
      state.ingredientCounts[action.payload]++;
      state.totalPrice += INGREDIENT_PRICES[action.payload];
    })
    .addCase(decrementIngredient, (state, action) => {
      state.ingredientCounts[action.payload]--;
      state.totalPrice -= INGREDIENT_PRICES[action.payload];
    })
);

export default burgerReducer;
