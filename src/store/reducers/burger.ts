import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { INGREDIENT_PRICES } from "../../shared/constants/burger";
import { IngredientCounts, IngredientType } from "../../shared/types/burger";
import { fetchIngredientCounts } from "../thunks/burger";

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

export const selectBurger = (state: RootState) => state.burger;

export const {
  addIngredient,
  removeIngredient,
  clearBurgerBuilder,
} = burgerSlice.actions;

export default burgerSlice.reducer;
