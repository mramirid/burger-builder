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

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const burger = useSelector((state: RootState) => state.burger);

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

  return (
    <Layout>
      <Route path="/" exact component={BurgerBuilder} />
      <Route
        path="/checkout"
        render={() =>
          burger.ingredientCounts ? <Checkout /> : <Redirect to="/" />
        }
      />
      <Route path="/orders" component={Orders} />
      <Route path="/auth" component={Auth} />
    </Layout>
  );
}

export default App;
