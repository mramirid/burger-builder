import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import { getUserAuth } from "./shared/helpers/auth-local-storage";
import { logout, setUserAuth } from "./store/reducers/auth";
import Logout from "./containers/Auth/Logout/Logout";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const burger = useSelector((state: RootState) => state.burger);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Try auto login
    const userAuthData = getUserAuth();
    if (
      userAuthData.token &&
      userAuthData.userId &&
      userAuthData.tokenExpirationDate
    ) {
      const tokenExpirationDate =
        userAuthData.tokenExpirationDate - new Date().getTime();

      if (tokenExpirationDate > 0) {
        const authTimerId = window.setTimeout(() => {
          dispatch(logout());
        }, tokenExpirationDate);
        dispatch(
          setUserAuth({
            userId: userAuthData.userId,
            token: userAuthData.token,
            authTimerId,
          })
        );
      }
    }
  }, [dispatch]);

  return (
    <Layout>
      <Route path="/" exact component={BurgerBuilder} />
      <Route
        path="/checkout"
        render={() => {
          return burger.ingredientCounts && auth.token ? (
            <Checkout />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
      <Route
        path="/orders"
        render={() => {
          return auth.token ? <Orders /> : <Redirect to="/" />;
        }}
      />
      <Route path="/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
    </Layout>
  );
}

export default App;
