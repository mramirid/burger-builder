import { createAsyncThunk } from "@reduxjs/toolkit";

import { fireDBAxios } from "../../axios/firebase";
import { FireGETIngreCounts } from "../../shared/types/burger";
import { AppThunkAPIConfig } from "../types";

export const fetchIngredientCounts = createAsyncThunk<
  FireGETIngreCounts,
  void,
  AppThunkAPIConfig
>("burger/fetchIngredientCounts", async (_, thunkAPI) => {
  try {
    const response = await fireDBAxios.get<FireGETIngreCounts>(
      "/ingredients.json"
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
