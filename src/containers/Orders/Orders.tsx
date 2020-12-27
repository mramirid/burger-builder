import { FC } from "react";

import Order from "../../components/Order/Order";

interface OrdersProps {}

const Orders: FC<OrdersProps> = (props) => (
  <div>
    <Order />
    <Order />
  </div>
);

export default Orders;
