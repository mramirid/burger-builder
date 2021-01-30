import { FC } from "react";

import Button from "../../UI/Button/Button";
import { IngredientCounts, IngredientType } from "../../../types/burger";
import { BtnClickHandler } from "../../../types/event-handlers";

interface OrderSummaryProps {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
  onOrdered: BtnClickHandler;
  onOrderCanceled: BtnClickHandler;
}

const OrderSummary: FC<OrderSummaryProps> = (props) => {
  const ingredientSummaries = Object.keys(props.ingredientCounts).map((key) => {
    const type = key as IngredientType;
    if (
      type === IngredientType.BreadTop ||
      type === IngredientType.BreadBottom
    ) {
      return null;
    }

    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>
        {": " + props.ingredientCounts[type]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummaries}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType={"Danger"} onClicked={props.onOrderCanceled}>
        CANCEL
      </Button>
      <Button btnType={"Success"} onClicked={props.onOrdered}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
