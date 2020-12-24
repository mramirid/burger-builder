import axios from "axios";

import { IngredientType } from "../components/Burger/types";

/*
 * Types for Firebase payload
 */
export interface PostResponse {
  name: string;
}

export interface GetIngredientCounts {
  [IngredientType.Salad]: number;
  [IngredientType.Bacon]: number;
  [IngredientType.Cheese]: number;
  [IngredientType.Meat]: number;
}

/*
 * Axios instance for Firebase Realtime Database
 */
const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_URL,
});

export default instance;
