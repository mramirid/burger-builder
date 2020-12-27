import { Route } from "react-router-dom";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <Layout>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
    </Layout>
  );
}

export default App;
