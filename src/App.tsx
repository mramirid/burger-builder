import { useState } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";

function App() {
  const [isBuilderDisplayed, setIsBuilderDisplayed] = useState(true);

  setTimeout(() => {
    setIsBuilderDisplayed(false);
  }, 2000);

  return <Layout>{isBuilderDisplayed ? <BurgerBuilder /> : null}</Layout>;
}

export default App;
