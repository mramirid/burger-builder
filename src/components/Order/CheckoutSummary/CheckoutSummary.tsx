import { FC } from "react";

import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import { IngredientCounts } from "../../../types/burger";
import { BtnClickHandler } from "../../../types/event-handlers";

interface CheckoutSummaryProps {
  ingredientCounts: IngredientCounts;
  onCheckoutCanceled: BtnClickHandler;
  onCheckoutContinued: BtnClickHandler;
}

const CheckoutSummary: FC<CheckoutSummaryProps> = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingredientCounts={props.ingredientCounts} />
    </div>
    <Button btnType="Danger" onClicked={props.onCheckoutCanceled}>
      CANCEL
    </Button>
    <Button btnType="Success" onClicked={props.onCheckoutContinued}>
      CONTINUE
    </Button>
  </div>
);

export default CheckoutSummary;
