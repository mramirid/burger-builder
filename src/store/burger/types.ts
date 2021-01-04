import { IngredientCounts } from "../../shared/types/burger";

export interface BurgerState {
  ingredientCounts: IngredientCounts | null;
  totalPrice: number;
  isFetchError: boolean;
}
