import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { fireDBAxios } from "../../axios/firebase";
import {
  FireGETIngreCounts,
  IngredientCounts,
  IngredientType,
} from "../../types/burger";
import { initIngredientCounts, setInitError } from "../reducers/burger";
import { INGREDIENT_PRICES } from "../../constants/burger";

export function* onInitIngredientCounts() {
  try {
    const response: AxiosResponse<FireGETIngreCounts> = yield call(() => {
      return fireDBAxios.get<FireGETIngreCounts>("/ingredients.json");
    });
    if (response.status >= 400) {
      throw new Error();
    }

    const loadedIngreCounts: IngredientCounts = {
      breadTop: 1,
      ...response.data,
      breadBottom: 1,
    };

    const totalPrice = Object.keys(loadedIngreCounts)
      .map((key) => {
        const type = key as IngredientType;
        return INGREDIENT_PRICES[type] * loadedIngreCounts[type];
      })
      .reduce((sum, curPrice) => sum + curPrice, 0);

    yield put(initIngredientCounts({ loadedIngreCounts, totalPrice }));
  } catch (_) {
    yield put(setInitError());
  }
}
