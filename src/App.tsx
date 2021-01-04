import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { RootState } from "./store";

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
    </Layout>
  );
}

export default App;
