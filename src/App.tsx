import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { AppDispatch, RootState } from "./store";
import { fetchIngredientCounts } from "./store/burger/reducer";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const burger = useSelector((state: RootState) => state.burger);

  useEffect(() => {
    if (!burger.ingredientCounts) {
      dispatch(fetchIngredientCounts());
    }
  }, [burger.ingredientCounts, dispatch]);

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
