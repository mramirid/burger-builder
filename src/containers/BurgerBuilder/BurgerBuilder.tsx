import { FC, useCallback, useEffect, useState } from "react";

import Burger, { IngredientCounts } from "../../components/Burger/Burger";
import BuildControls, {
  Controls,
} from "../../components/Burger/BuildControls/BuildControls";
import {
  IngredientType,
  INGREDIENT_PRICES,
} from "../../components/Burger/BurgerIngredient/BurgerIngredient";

const BurgerBuilder: FC = () => {
  const [totalPrice, setTotalPrice] = useState(4.0);
  const [ingredientCounts, setIngredientCounts] = useState<IngredientCounts>({
    breadTop: 1,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    breadBottom: 1,
  });

  const addIngredient = useCallback((type: IngredientType) => {
    setIngredientCounts((ingredientCounts) => {
      setTotalPrice((totalPrice) => totalPrice + INGREDIENT_PRICES[type]);
      const updatedCounts = { ...ingredientCounts };
      updatedCounts[type] = ingredientCounts[type] + 1;
      return updatedCounts;
    });
  }, []);

  const removeIngredient = useCallback((type: IngredientType) => {
    setIngredientCounts((ingredientCounts) => {
      if (ingredientCounts[type] === 0) {
        return ingredientCounts;
      }
      setTotalPrice((totalPrice) => totalPrice - INGREDIENT_PRICES[type]);
      const updatedCounts = { ...ingredientCounts };
      updatedCounts[type] = ingredientCounts[type] - 1;
      return updatedCounts;
    });
  }, []);

  const [controls, setControls] = useState<Controls>([
    {
      label: "Salad",
      type: IngredientType.Salad,
      isLessBtnDisabled: false,
    },
    {
      label: "Bacon",
      type: IngredientType.Bacon,
      isLessBtnDisabled: false,
    },
    {
      label: "Cheese",
      type: IngredientType.Cheese,
      isLessBtnDisabled: false,
    },
    {
      label: "Meat",
      type: IngredientType.Meat,
      isLessBtnDisabled: false,
    },
  ]);

  useEffect(() => {
    setControls((controls) => {
      const updatedControls = controls.map((control) => ({
        ...control,
        isLessBtnDisabled: ingredientCounts[control.type] === 0,
      }));
      return updatedControls;
    });
  }, [ingredientCounts]);

  return (
    <>
      <Burger ingredientCounts={ingredientCounts} />
      <BuildControls
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        controls={controls}
      />
    </>
  );
};

export default BurgerBuilder;
