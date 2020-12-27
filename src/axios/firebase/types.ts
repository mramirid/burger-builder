import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import {
  Contact,
  DeliveryMethod,
} from "../../containers/Checkout/ContactData/types";

/*
 * Types for Firebase payload
 */
export interface GetIngredientCounts {
  [IngredientType.Salad]: number;
  [IngredientType.Bacon]: number;
  [IngredientType.Cheese]: number;
  [IngredientType.Meat]: number;
}

export interface PostResponse {
  name: string;
}

export interface PostOrder {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
  deliveryMethod: DeliveryMethod;
  contact: Contact;
}

export interface GetOrders {
  [orderId: string]: PostOrder;
}
