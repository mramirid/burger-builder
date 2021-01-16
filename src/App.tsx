import { lazy, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store";
import { tryAutoSignIn } from "./store/reducers/auth";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { fetchIngredientCounts, selectBurger } from "./store/reducers/burger";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import withSuspense from "./hoc/withSuspense/withSuspense";
import Spinner from "./components/UI/Spinner/Spinner";
import withAuth from "./hoc/withAuth/withAuth";

const Auth = lazy(() => import("./containers/Auth/Auth"));
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));

function App() {
  const dispatch = useAppDispatch();
  const burger = useAppSelector(selectBurger);

  useEffect(() => {
    dispatch(tryAutoSignIn());
    dispatch(fetchIngredientCounts());
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={withSuspense(Auth, Spinner)} />
        <Route path="/logout" component={withAuth(Logout)} />
        <Route
          path="/orders"
          component={withAuth(withSuspense(Orders, Spinner))}
        />
        <Route
          path="/checkout"
          render={() => {
            const CheckoutHOC = withAuth(withSuspense(Checkout, Spinner));
            return burger.ingredientCounts && <CheckoutHOC />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
