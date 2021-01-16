import { FC, useCallback } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { selectBurger } from "../../store/reducers/burger";
import { useAppSelector } from "../../store";

const Checkout: FC = () => {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const burger = useAppSelector(selectBurger);

  const continueCheckout = useCallback(() => {
    history.replace("/checkout/contact-data");
  }, [history]);

  const cancelCheckout = useCallback(() => history.goBack(), [history]);

  return (
    <>
      <CheckoutSummary
        ingredientCounts={burger.ingredientCounts!}
        onCheckoutCanceled={cancelCheckout}
        onCheckoutContinued={continueCheckout}
      />
      <Route path={`${routeMatch.path}/contact-data`} component={ContactData} />
    </>
  );
};

export default Checkout;
