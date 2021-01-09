import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "./store";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

function App() {
  const burger = useSelector((state: RootState) => state.burger);
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
