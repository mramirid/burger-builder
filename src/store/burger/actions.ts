import { createAction } from "@reduxjs/toolkit";
import { IngredientType } from "../../shared/types/burger";
import { INCREMENT_INGREDIENT, DECREMENT_INGREDIENT } from "./types";

/*
 * Action constants
 */
export const incrementIngredient = createAction<
  IngredientType,
  typeof INCREMENT_INGREDIENT
>(INCREMENT_INGREDIENT);

export const decrementIngredient = createAction<
  IngredientType,
  typeof DECREMENT_INGREDIENT
>(DECREMENT_INGREDIENT);
