import { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IngredientType } from "../../shared/types/burger";
import fireAxios from "../../axios/firebase";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";
import { RootState, AppDispatch } from "../../store";
import {
  addIngredient,
  removeIngredient,
  fetchIngredientCounts,
} from "../../store/burger";

const BurgerBuilder: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const burger = useSelector((state: RootState) => state.burger);

  const [isPurchasing, setIsPurchasing] = useState(false);

  const determinePurchasable = useCallback(() => {
    let isPurchasable = false;
    if (burger.ingredientCounts) {
      const totalCounts = Object.keys(burger.ingredientCounts)
        .map((key) => burger.ingredientCounts![key as IngredientType])
        .reduce((sum, curCount) => sum + curCount, 0);
      isPurchasable = totalCounts > 2;
    }
    return isPurchasable;
  }, [burger.ingredientCounts]);

  useEffect(() => dispatch(fetchIngredientCounts()), [dispatch]);

  let burgerBuilder: JSX.Element | null = null;
  if (burger.isFetchError) {
    burgerBuilder = (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
    );
  } else if (burger.ingredientCounts) {
    burgerBuilder = (
      <>
        <Burger ingredientCounts={burger.ingredientCounts} />
        <BuildControls
          ingredientCounts={burger.ingredientCounts}
          totalPrice={burger.totalPrice}
          purchasable={determinePurchasable()}
          addIngredient={(type) => dispatch(addIngredient(type))}
          removeIngredient={(type) => dispatch(removeIngredient(type))}
          onOrder={() => setIsPurchasing(true)}
        />
      </>
    );
  }

  let modalChild: JSX.Element | null = null;
  if (burger.ingredientCounts) {
    modalChild = (
      <OrderSummary
        ingredientCounts={burger.ingredientCounts}
        totalPrice={burger.totalPrice}
        onOrdered={() => history.push("/checkout")}
        onOrderCanceled={() => setIsPurchasing(false)}
      />
    );
  }
  return (
    <>
      {burgerBuilder || <Spinner />}
      <Modal isDisplayed={isPurchasing} onClosed={() => setIsPurchasing(false)}>
        {modalChild || <Spinner />}
      </Modal>
    </>
  );
};

export default withErrorModal(BurgerBuilder, fireAxios);
