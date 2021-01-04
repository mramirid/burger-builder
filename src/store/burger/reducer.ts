import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INGREDIENT_PRICES } from "../../shared/constants/burger";
import { IngredientType } from "../../shared/types/burger";
import { BurgerState } from "./types";

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

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<IngredientType>) {
      state.ingredientCounts[action.payload]++;
      state.totalPrice += INGREDIENT_PRICES[action.payload];
    },
    removeIngredient(state, action: PayloadAction<IngredientType>) {
      state.ingredientCounts[action.payload]--;
      state.totalPrice -= INGREDIENT_PRICES[action.payload];
    },
  },
});

export const { addIngredient, removeIngredient } = burgerSlice.actions;
export default burgerSlice.reducer;
