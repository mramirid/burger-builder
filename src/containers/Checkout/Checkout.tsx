import { FC, useCallback } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { RootState } from "../../store";
import ContactData from "./ContactData/ContactData";

const Checkout: FC<RouteComponentProps> = (props) => {
  const burger = useSelector((state: RootState) => state.burger);

  const continueCheckout = useCallback(() => {
    props.history.replace("/checkout/contact-data");
  }, [props.history]);

  const cancelCheckout = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <>
      <CheckoutSummary
        ingredientCounts={burger.ingredientCounts}
        onCheckoutCanceled={cancelCheckout}
        onCheckoutContinued={continueCheckout}
      />
      <Route
        path={`${props.match.path}/contact-data`}
        component={ContactData}
      />
    </>
  );
};

export default Checkout;
