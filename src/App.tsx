import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { tryAutoSignIn } from "./store/reducers/auth";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const burger = useSelector((state: RootState) => state.burger);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(tryAutoSignIn());
  }, [dispatch]);

  return (
    <Layout>
      <Route path="/" exact component={BurgerBuilder} />
      {burger.ingredientCounts && auth.token && (
        <Route path="/checkout" component={Checkout} />
      )}
      {auth.token && <Route path="/orders" component={Orders} />}
      <Route path="/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
      <Redirect to="/" />
    </Layout>
  );
}

export default App;
