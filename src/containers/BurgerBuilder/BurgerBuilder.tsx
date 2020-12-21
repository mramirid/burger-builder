import { FC, useCallback, useState } from "react";

import Burger from "../../components/Burger/Burger";
import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import { INGREDIENT_PRICES } from "../../components/Burger/constants";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const BurgerBuilder: FC = () => {
  const [ingredientCounts, setIngredientCounts] = useState<IngredientCounts>({
    breadTop: 1,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    breadBottom: 1,
  });
  const [totalPrice, setTotalPrice] = useState(4.0);
  const [purchasable, setPurchasable] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const togglePurchasable = useCallback(
    (ingredientCounts: IngredientCounts) => {
      const sum = Object.keys(ingredientCounts)
        .map((key) => ingredientCounts[key as IngredientType])
        .reduce((sum, curCount) => sum + curCount, 0);
      setPurchasable(sum > 2);
    },
    []
  );

  const addIngredient = useCallback(
    (type: IngredientType) => {
      setIngredientCounts((ingredientCounts) => {
        const updatedIngreCounts = { ...ingredientCounts };
        updatedIngreCounts[type] = ingredientCounts[type] + 1;
        togglePurchasable(updatedIngreCounts);
        setTotalPrice((totalPrice) => totalPrice + INGREDIENT_PRICES[type]);
        return updatedIngreCounts;
      });
    },
    [togglePurchasable]
  );

  const removeIngredient = useCallback(
    (type: IngredientType) => {
      setIngredientCounts((ingredientCounts) => {
        if (ingredientCounts[type] === 0) {
          return ingredientCounts;
        }
        const updatedIngreCounts = { ...ingredientCounts };
        updatedIngreCounts[type] = ingredientCounts[type] - 1;
        togglePurchasable(updatedIngreCounts);
        setTotalPrice((totalPrice) => totalPrice - INGREDIENT_PRICES[type]);
        return updatedIngreCounts;
      });
    },
    [togglePurchasable]
  );

  const startPurchase = useCallback(() => setIsPurchasing(true), []);

  const continuePurchase = useCallback(() => alert("You continue!"), []);

  const cancelPurchase = useCallback(() => setIsPurchasing(false), []);

  return (
    <>
      <Burger ingredientCounts={ingredientCounts} />
      <BuildControls
        ingredientCounts={ingredientCounts}
        totalPrice={totalPrice}
        purchasable={purchasable}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        onOrder={startPurchase}
      />
      <Modal isDisplayed={isPurchasing} onClosed={cancelPurchase}>
        <OrderSummary
          ingredientCounts={ingredientCounts}
          totalPrice={totalPrice}
          onOrdered={continuePurchase}
          onOrderCanceled={cancelPurchase}
        />
      </Modal>
    </>
  );
};

export default BurgerBuilder;
