import { FC } from "react";
import { IngredientCounts } from "../../components/Burger/types";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const dummyIngredientCounts: IngredientCounts = {
  breadTop: 1,
  salad: 1,
  bacon: 1,
  cheese: 1,
  meat: 1,
  breadBottom: 1,
};

const Checkout: FC = () => (
  <>
    <CheckoutSummary ingredientCounts={dummyIngredientCounts} />
  </>
);

export default Checkout;
