import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { INGREDIENT_PRICES } from "../../shared/constants/burger";
import {
  IngredientCounts,
  IngredientType,
  InitIngreCountsPayload,
} from "../../shared/types/burger";

export interface BurgerState {
  ingredientCounts: IngredientCounts | null;
  totalPrice: number;
  isFetchError: boolean;
}

export const initialState: BurgerState = {
  ingredientCounts: null,
  totalPrice: 0,
  isFetchError: false,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    initIngredientCounts(state, action: PayloadAction<InitIngreCountsPayload>) {
      state.ingredientCounts = action.payload.loadedIngreCounts;
      state.totalPrice = action.payload.totalPrice;
      state.isFetchError = false;
    },
    setInitError(state) {
      state.isFetchError = true;
    },
    addIngredient(state, action: PayloadAction<IngredientType>) {
      if (state.ingredientCounts) {
        state.ingredientCounts[action.payload]++;
        state.totalPrice += INGREDIENT_PRICES[action.payload];
      }
    },
    removeIngredient(state, action: PayloadAction<IngredientType>) {
      if (state.ingredientCounts) {
        state.ingredientCounts[action.payload]--;
        state.totalPrice -= INGREDIENT_PRICES[action.payload];
      }
    },
    clearBurgerBuilder(state) {
      if (state.ingredientCounts) {
        state.ingredientCounts = {
          ...state.ingredientCounts,
          bacon: 0,
          cheese: 0,
          meat: 0,
          salad: 0,
        };
        state.totalPrice =
          INGREDIENT_PRICES[IngredientType.BreadTop] +
          INGREDIENT_PRICES[IngredientType.BreadBottom];
      }
    },
  },
});

export const selectBurger = (state: RootState) => state.burger;

export const {
  initIngredientCounts,
  setInitError,
  addIngredient,
  removeIngredient,
  clearBurgerBuilder,
} = burgerSlice.actions;

export default burgerSlice.reducer;
