import { createAsyncThunk } from "@reduxjs/toolkit";

import { fireDBAxios } from "../../axios/firebase";
import { FirePOSTResBody } from "../../shared/types/firebase";
import { IOrder, FirePOSTOrder, FireGETOrders } from "../../shared/types/order";
import { AppThunkAPIConfig } from "../types";

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
