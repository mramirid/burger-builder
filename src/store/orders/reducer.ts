import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import fireAxios from "../../axios/firebase";
import { PostOrder, PostResponse } from "../../shared/types/firebase";
import { IOrder } from "../../shared/types/order";
import { AppThunkAPIConfig } from "../types";
import { OrdersState } from "./types";

export const postOrder = createAsyncThunk<IOrder, PostOrder, AppThunkAPIConfig>(
  "burger/postOrder",
  async (submittedOrder, thunkAPI) => {
    try {
      const response = await fireAxios.post<PostResponse>(
        "/orders.json",
        submittedOrder
      );
      if (response.status >= 400) {
        const error = new Error("Failed to POST order");
        return thunkAPI.rejectWithValue(error);
      }
      return {
        id: response.data.name,
        ...submittedOrder,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: OrdersState = {
  orders: [],
  isFetchError: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isFetchError = false;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.isFetchError = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.isFetchError = true;
      });
  },
});

export default ordersSlice.reducer;
