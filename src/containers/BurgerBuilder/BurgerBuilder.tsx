import { FC, useCallback, useState } from "react";

import Burger, { Ingredients } from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import {
  IngredientType,
  INGREDIENT_PRICES,
} from "../../components/Burger/BurgerIngredient/BurgerIngredient";

const BurgerBuilder: FC = () => {
  const [ingredients, setIngredients] = useState<Ingredients>({
    breadTop: 1,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    breadBottom: 1,
  });
  const [totalPrice, setTotalPrice] = useState(4.0);

  const addIngredient = useCallback((type: IngredientType) => {
    setIngredients((ingredients) => {
      setTotalPrice((totalPrice) => totalPrice + INGREDIENT_PRICES[type]);
      ingredients[type]++;
      return ingredients;
    });
  }, []);

  const removeIngredient = useCallback((type: IngredientType) => {}, []);

  return (
    <>
      <Burger ingredients={ingredients} />
      <BuildControls onIngredientAdded={addIngredient} />
    </>
  );
};

export default BurgerBuilder;
