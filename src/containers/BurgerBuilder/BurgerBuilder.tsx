import { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { IngredientType } from "../../types/burger";
import { fireDBAxios } from "../../axios/firebase";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useAppSelector, useAppDispatch } from "../../store";
import { selectToken } from "../../store/reducers/auth";
import {
  addIngredient,
  clearBurgerBuilder,
  removeIngredient,
  selectBurger,
} from "../../store/reducers/burger";
import { selectOrders, setDidPurchase } from "../../store/reducers/orders";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";

const MySwal = withReactContent(Swal);

export const BurgerBuilder: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const burger = useAppSelector(selectBurger);
  const orders = useAppSelector(selectOrders);
  const token = useAppSelector(selectToken);

  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    if (orders.didPurchase) {
      dispatch(clearBurgerBuilder());
      dispatch(setDidPurchase(false));
      MySwal.fire("Success", "Order Success", "success");
    }
  }, [burger.ingredientCounts, dispatch, orders.didPurchase]);

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
          isAuthenticated={!!token}
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

export default withErrorModal(BurgerBuilder, fireDBAxios);
