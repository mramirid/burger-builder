import { FC, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";

import { IngredientType } from "../../components/Burger/types";
import fireAxios from "../../axios/firebase/instance";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";
import { RootState, useAppDispatch } from "../../store";
import {
  decrementIngredient,
  incrementIngredient,
} from "../../store/burger/actions";

const BurgerBuilder: FC<RouteComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const burger = useSelector((state: RootState) => state.burger);

  const determinePurchasable = useCallback(() => {
    const totalCounts = Object.keys(burger.ingredientCounts)
      .map((key) => burger.ingredientCounts[key as IngredientType])
      .reduce((sum, curCount) => sum + curCount, 0);
    return totalCounts > 2;
  }, [burger.ingredientCounts]);

  const [isFetchIngreError] = useState(false);

  // useEffect(() => {
  //   fireAxios
  //     .get<GetIngredientCounts>("/ingredients.json")
  //     .then((response) => {
  //       const loadedIngreCounts = {
  //         breadTop: 1,
  //         ...response.data,
  //         breadBottom: 1,
  //       };
  //       const totalPrice = Object.keys(loadedIngreCounts)
  //         .map((key) => {
  //           const type = key as IngredientType;
  //           return INGREDIENT_PRICES[type] * loadedIngreCounts[type];
  //         })
  //         .reduce((sum, curPrice) => sum + curPrice, 0);
  //       setIngredientCounts(() => {
  //         togglePurchasable(loadedIngreCounts);
  //         return loadedIngreCounts;
  //       });
  //     })
  //     .catch(() => setIsFetchIngreError(true));
  // }, [togglePurchasable]);

  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isLoading] = useState(false);

  let burgerBuilder: JSX.Element | null = null;
  if (isFetchIngreError) {
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
          addIngredient={(type) => dispatch(incrementIngredient(type))}
          removeIngredient={(type) => dispatch(decrementIngredient(type))}
          onOrder={() => setIsPurchasing(true)}
        />
      </>
    );
  }

  let modalChild: JSX.Element | null = null;
  if (!isLoading && burger.ingredientCounts) {
    modalChild = (
      <OrderSummary
        ingredientCounts={burger.ingredientCounts}
        totalPrice={burger.totalPrice}
        onOrdered={() => props.history.push("/checkout")}
        onOrderCanceled={() => setIsPurchasing(false)}
      />
    );
  }
  return (
    <>
      {burgerBuilder || <Spinner />}
      <Modal
        isDisplayed={isPurchasing}
        isLoading={isLoading}
        onClosed={() => setIsPurchasing(false)}
      >
        {modalChild || <Spinner />}
      </Modal>
    </>
  );
};

export default withErrorModal(BurgerBuilder, fireAxios);
