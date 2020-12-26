import axios from "axios";

import { IngredientCounts, IngredientType } from "../components/Burger/types";
import { Contact } from "../containers/Checkout/ContactData/types";

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
  deliveryMethod: string;
  contact: Contact;
}

/*
 * Axios instance for Firebase Realtime Database
 */
const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_URL,
});

export default instance;
