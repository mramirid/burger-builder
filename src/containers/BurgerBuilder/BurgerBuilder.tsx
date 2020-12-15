import { FC, useState } from "react";

import Burger, { Ingredients } from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const BurgerBuilder: FC = () => {
  const [ingredients] = useState<Ingredients>({
    breadTop: 1,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    breadBottom: 1,
  });

  return (
    <>
      <Burger ingredients={ingredients} />
      <BuildControls />
    </>
  );
};

export default BurgerBuilder;
