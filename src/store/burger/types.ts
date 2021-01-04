import { IngredientCounts } from "../../shared/types/burger";

export const namespace = "burger";

export interface BurgerState {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
}
