import { IOrder } from "../../shared/types/order";

export interface OrdersState {
  orders: IOrder[];
  isFetchError: boolean;
  didPurchase: boolean;
}
