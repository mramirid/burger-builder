import { FC, useCallback, useState } from "react";

import Burger from "../../components/Burger/Burger";
import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import { INGREDIENT_PRICES } from "../../components/Burger/constants";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const BurgerBuilder: FC = () => {
  const [canOrder, setCanOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(4.0);
  const [ingredientCounts, setIngredientCounts] = useState<IngredientCounts>({
    breadTop: 1,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    breadBottom: 1,
  });

  const toggleCanOrder = useCallback((ingredientCounts: IngredientCounts) => {
    const sum = Object.keys(ingredientCounts)
      .map((key) => ingredientCounts[key as IngredientType])
      .reduce((sum, curCount) => sum + curCount, 0);
    setCanOrder(sum > 2);
  }, []);

  const addIngredient = useCallback(
    (type: IngredientType) => {
      setIngredientCounts((ingredientCounts) => {
        const updatedIngreCounts = { ...ingredientCounts };
        updatedIngreCounts[type] = ingredientCounts[type] + 1;
        toggleCanOrder(updatedIngreCounts);
        setTotalPrice((totalPrice) => totalPrice + INGREDIENT_PRICES[type]);
        return updatedIngreCounts;
      });
    },
    [toggleCanOrder]
  );

  const removeIngredient = useCallback(
    (type: IngredientType) => {
      setIngredientCounts((ingredientCounts) => {
        if (ingredientCounts[type] === 0) {
          return ingredientCounts;
        }
        const updatedIngreCounts = { ...ingredientCounts };
        updatedIngreCounts[type] = ingredientCounts[type] - 1;
        toggleCanOrder(updatedIngreCounts);
        setTotalPrice((totalPrice) => totalPrice - INGREDIENT_PRICES[type]);
        return updatedIngreCounts;
      });
    },
    [toggleCanOrder]
  );

  return (
    <>
      <Burger ingredientCounts={ingredientCounts} />
      <BuildControls
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        ingredientCounts={ingredientCounts}
        totalPrice={totalPrice}
        canOrder={canOrder}
      />
    </>
  );
};

export default BurgerBuilder;
