import { IngredientCounts } from "../../shared/types/burger";

/*
 * State Type
 */
export interface BurgerState {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
}

/*
 * Action Types
 */
export const INCREMENT_INGREDIENT = "INCREMENT_INGREDIENT";
export const DECREMENT_INGREDIENT = "DECREMENT_INGREDIENT";
