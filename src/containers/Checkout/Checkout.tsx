import { FC, useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout: FC<RouteComponentProps> = (props) => {
  const [ingredientCounts, setIngreCounts] = useState<IngredientCounts>({
    breadTop: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
    breadBottom: 0,
  });

  useEffect(() => {
    setIngreCounts((prevIngreCounts) => {
      const query = new URLSearchParams(props.location.search);
      const submittedIngreCounts: IngredientCounts = { ...prevIngreCounts };
      for (const param of query.entries()) {
        const type = param[0] as IngredientType;
        const count = +param[1];
        submittedIngreCounts[type] = count;
      }
      return submittedIngreCounts;
    });
  }, [props.location.search]);

  const continueCheckout = useCallback(() => {
    props.history.replace("/checkout/contact-data");
  }, [props.history]);

  const cancelCheckout = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <>
      <CheckoutSummary
        ingredientCounts={ingredientCounts}
        onCheckoutCanceled={cancelCheckout}
        onCheckoutContinued={continueCheckout}
      />
    </>
  );
};

export default Checkout;
