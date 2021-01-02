import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INGREDIENT_PRICES } from "../shared/constants/burger";
import { IngredientCounts, IngredientType } from "../shared/types/burger";

/*
 * State
 */
interface BurgerState {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
}

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
 * Slice
 */
const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    incrementIngredient(state, action: PayloadAction<IngredientType>) {
      state.ingredientCounts[action.payload]++;
      state.totalPrice += INGREDIENT_PRICES[action.payload];
    },
    decrementIngredient(state, action: PayloadAction<IngredientType>) {
      state.ingredientCounts[action.payload]--;
      state.totalPrice -= INGREDIENT_PRICES[action.payload];
    },
  },
});

export const { incrementIngredient, decrementIngredient } = burgerSlice.actions;
export default burgerSlice.reducer;
