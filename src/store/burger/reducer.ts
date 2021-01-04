import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INGREDIENT_PRICES } from "../../shared/constants/burger";
import { IngredientType } from "../../shared/types/burger";
import { fetchIngredientCounts } from "./thunks";
import { BurgerState } from "./types";

const initialState: BurgerState = {
  ingredientCounts: null,
  totalPrice: 0,
  isFetchError: false,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientCounts.fulfilled, (state, action) => {
        const loadedIngreCounts = {
          breadTop: 1,
          ...action.payload,
          breadBottom: 1,
        };

        const totalPrice = Object.keys(loadedIngreCounts)
          .map((key) => {
            const type = key as IngredientType;
            return INGREDIENT_PRICES[type] * loadedIngreCounts[type];
          })
          .reduce((sum, curPrice) => sum + curPrice, 0);

        state.ingredientCounts = loadedIngreCounts;
        state.totalPrice = totalPrice;
        state.isFetchError = false;
      })
      .addCase(fetchIngredientCounts.rejected, (state) => {
        state.isFetchError = true;
      });
  },
});

export const { addIngredient, removeIngredient } = burgerSlice.actions;
export default burgerSlice.reducer;
