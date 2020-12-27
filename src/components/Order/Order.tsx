import { FC } from "react";

import classes from "./Order.module.css";

interface OrderProps {}

const Order: FC<OrderProps> = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>
      Price: <strong>USD 5.45</strong>
    </p>
  </div>
);

export default Order;
