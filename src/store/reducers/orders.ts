import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrder } from "../../shared/types/order";
import { fetchOrders, postOrder } from "../thunks/orders";
import { RootState } from "../types";

export interface OrdersState {
  orders: IOrder[];
  isFetchError: boolean;
  didPurchase: boolean;
}

export const initialState: OrdersState = {
  orders: [],
  isFetchError: false,
  didPurchase: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setDidPurchase(state, action: PayloadAction<boolean>) {
      state.didPurchase = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
      state.isFetchError = false;
      state.didPurchase = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isFetchError = false;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.isFetchError = false;
        state.didPurchase = true;
      })
      .addCase(postOrder.rejected, (state) => {
        state.isFetchError = true;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isFetchError = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isFetchError = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isFetchError = true;
      });
  },
});

export const selectOrders = (state: RootState) => state.orders;

export const { setDidPurchase, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
