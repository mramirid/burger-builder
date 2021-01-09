export enum IngredientType {
  BreadTop = "breadTop",
  Meat = "meat",
  Cheese = "cheese",
  Salad = "salad",
  Bacon = "bacon",
  BreadBottom = "breadBottom",
}

export interface IngredientCounts {
  [IngredientType.BreadTop]: number;
  [IngredientType.Salad]: number;
  [IngredientType.Bacon]: number;
  [IngredientType.Cheese]: number;
  [IngredientType.Meat]: number;
  [IngredientType.BreadBottom]: number;
}

/*
 * Firebase
 */
export interface FireGETIngreCounts {
  [IngredientType.Salad]: number;
  [IngredientType.Bacon]: number;
  [IngredientType.Cheese]: number;
  [IngredientType.Meat]: number;
}
