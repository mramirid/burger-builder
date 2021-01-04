import { createAsyncThunk } from "@reduxjs/toolkit";

import fireAxios from "../../axios/firebase";
import { GetIngredientCounts } from "../../shared/types/firebase";
import { HTTPThunkAPIConfig } from "../types";

export const fetchIngredientCounts = createAsyncThunk<
  GetIngredientCounts,
  void,
  HTTPThunkAPIConfig
>("burger/fetchIngredientCounts", async (_, thunkAPI) => {
  try {
    const response = await fireAxios.get<GetIngredientCounts>(
      "/ingredients.json"
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
