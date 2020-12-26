import { Route } from "react-router-dom";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <Layout>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/checkout" component={Checkout} />
    </Layout>
  );
}

export default App;
