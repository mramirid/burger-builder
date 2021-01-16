import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { fireDBAxios } from "../../axios/firebase";
import { FirePOSTResBody } from "../../shared/types/firebase";
import { IOrder, FirePOSTOrder, FireGETOrders } from "../../shared/types/order";
import { AppThunkAPIConfig, RootState } from "../types";

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

export const postOrder = createAsyncThunk<
  IOrder,
  FirePOSTOrder,
  AppThunkAPIConfig
>("orders/postOrder", async (submittedOrder, thunkAPI) => {
  try {
    const response = await fireDBAxios.post<FirePOSTResBody>(
      `/orders.json?auth=${thunkAPI.getState().auth.token}`,
      submittedOrder
    );
    if (response.status >= 400) {
      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        message: "Failed to add order",
      });
    }
    return {
      id: response.data.name,
      ...submittedOrder,
    };
  } catch (axiosErr) {
    return thunkAPI.rejectWithValue({
      statusCode: axiosErr.response.status,
      message: axiosErr.response.data.error || "An error occurred",
    });
  }
});

export const fetchOrders = createAsyncThunk<IOrder[], void, AppThunkAPIConfig>(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const userAuth = thunkAPI.getState().auth;
      const response = await fireDBAxios.get<FireGETOrders>(
        `/orders.json?auth=${userAuth.token}&orderBy="userId"&equalTo="${userAuth.userId}"`
      );
      if (response.status >= 400) {
        return thunkAPI.rejectWithValue({
          statusCode: response.status,
          message: "Failed to fetch orders",
        });
      }
      const fetchedOrders: IOrder[] = [];
      for (const orderId in response.data) {
        fetchedOrders.push({
          id: orderId,
          ...response.data[orderId],
        });
      }
      return fetchedOrders;
    } catch (axiosErr) {
      return thunkAPI.rejectWithValue({
        statusCode: axiosErr.response.status,
        message: axiosErr.response.data.error || "An error occurred",
      });
    }
  }
);

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
