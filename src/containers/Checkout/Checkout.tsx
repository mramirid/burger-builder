import { FC, useCallback, useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout: FC<RouteComponentProps> = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
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
      for (const [key, value] of query.entries()) {
        if (key === "totalPrice") {
          setTotalPrice(() => +value);
        } else {
          const type = key as IngredientType;
          const count = +value;
          submittedIngreCounts[type] = count;
        }
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
      <Route
        path={`${props.match.path}/contact-data`}
        render={(props) => (
          <ContactData
            ingredientCounts={ingredientCounts}
            totalPrice={totalPrice}
            {...props}
          />
        )}
      />
    </>
  );
};

export default Checkout;
