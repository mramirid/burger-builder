import { IngredientCounts, IngredientType } from "../types/burger";
import { ContactFields } from "./contact";

export interface GetIngredientCounts {
  [IngredientType.Salad]: number;
  [IngredientType.Bacon]: number;
  [IngredientType.Cheese]: number;
  [IngredientType.Meat]: number;
}

export interface PostContact {
  [ContactFields.Name]: string;
  [ContactFields.Email]: string;
  [ContactFields.Street]: string;
  [ContactFields.Country]: string;
  [ContactFields.ZipCode]: string;
  [ContactFields.DeliveryMethod]: string;
}

export interface PostOrder {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
  contact: PostContact;
}

export interface PostResponse {
  name: string;
}

export interface GetOrders {
  [orderId: string]: PostOrder;
}
