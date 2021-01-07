import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import fireAxios from "../../axios/firebase";
import {
  GetOrders,
  PostOrder,
  PostResponse,
} from "../../shared/types/firebase";
import { IOrder } from "../../shared/types/order";
import { AppThunkAPIConfig } from "../types";
import { OrdersState } from "./types";

export const postOrder = createAsyncThunk<IOrder, PostOrder, AppThunkAPIConfig>(
  "orders/postOrder",
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

export const fetchOrders = createAsyncThunk<IOrder[], void, AppThunkAPIConfig>(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const response = await fireAxios.get<GetOrders>("/orders.json");
      if (response.status >= 400) {
        const error = new Error("Failed to fetch orders");
        return thunkAPI.rejectWithValue(error);
      }
      const fetchedOrders: IOrder[] = [];
      for (const orderId in response.data) {
        fetchedOrders.push({
          id: orderId,
          ...response.data[orderId],
        });
      }
      return fetchedOrders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: OrdersState = {
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

export const { setDidPurchase } = ordersSlice.actions;

export default ordersSlice.reducer;
