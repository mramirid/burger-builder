import { CSSProperties, FC } from "react";

import classes from "./Order.module.css";
import { IOrder } from "./../../shared/types/order";
import { IngredientType } from "../../shared/types/burger";

interface OrderProps {
  order: IOrder;
}

const Order: FC<OrderProps> = ({ order }) => {
  const ingreCountElements = Object.keys(order.ingredientCounts).map((key) => {
    const type = key as IngredientType;
    const styles: CSSProperties = {
      textTransform: "capitalize",
      display: "inline-block",
      margin: "0 8px",
      border: "1px solid #ccc",
      padding: "5px",
    };

    if (
      type === IngredientType.BreadTop ||
      type === IngredientType.BreadBottom
    ) {
      return null;
    }

    return (
      <span key={type} style={styles}>
        {type} ({order.ingredientCounts[type]})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingreCountElements}</p>
      <p>
        Price: <strong>USD {order.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
