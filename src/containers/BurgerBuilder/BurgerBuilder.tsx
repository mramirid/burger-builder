import { FC, useState } from "react";

import Burger, { Ingredients } from "../../components/Burger/Burger";

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
      <div>Build Controls</div>
    </>
  );
};

export default BurgerBuilder;
