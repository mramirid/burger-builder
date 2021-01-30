import { IngredientCounts } from "./burger";
import { FirePOSTContact } from "./contact";

export interface FirePOSTOrder {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
  contact: FirePOSTContact;
  userId: string;
}

export interface FireGETOrders {
  [orderId: string]: FirePOSTOrder;
}

export interface IOrder extends FirePOSTOrder {
  id: string;
}
