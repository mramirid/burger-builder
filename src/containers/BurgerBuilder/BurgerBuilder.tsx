import { FC, useCallback, useEffect, useState } from "react";

import Burger from "../../components/Burger/Burger";
import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import { INGREDIENT_PRICES } from "../../components/Burger/constants";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import fireAxios, {
  PostResponse,
  GetIngredientCounts,
} from "../../axios/firebase";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";

const BurgerBuilder: FC = () => {
  const [
    ingredientCounts,
    setIngredientCounts,
  ] = useState<IngredientCounts | null>(null);
  const [totalPrice, setTotalPrice] = useState(4.0);
  const [purchasable, setPurchasable] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isFetchIngreError, setIsFetchIngreError] = useState(false);

  useEffect(() => {
    fireAxios
      .get<GetIngredientCounts>("/ingredients.json")
      .then((response) => {
        setIngredientCounts({
          breadTop: 1,
          ...response.data,
          breadBottom: 1,
        });
      })
      .catch(() => setIsFetchIngreError(true));
  }, []);

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
        if (!ingredientCounts) {
          return null;
        }
        const updatedIngreCounts = { ...ingredientCounts };
        updatedIngreCounts[type] = ingredientCounts[type] + 1;
        togglePurchasable(updatedIngreCounts);
        setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
        return updatedIngreCounts;
      });
    },
    [totalPrice, togglePurchasable]
  );

  const removeIngredient = useCallback(
    (type: IngredientType) => {
      setIngredientCounts((ingredientCounts) => {
        if (!ingredientCounts || ingredientCounts[type] === 0) {
          return ingredientCounts;
        }
        const updatedIngreCounts = { ...ingredientCounts };
        updatedIngreCounts[type] = ingredientCounts[type] - 1;
        togglePurchasable(updatedIngreCounts);
        setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
        return updatedIngreCounts;
      });
    },
    [totalPrice, togglePurchasable]
  );

  const [isLoading, setIsLoading] = useState(false);

  const startPurchase = useCallback(() => setIsPurchasing(true), []);
  const cancelPurchase = useCallback(() => setIsPurchasing(false), []);
  const continuePurchase = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fireAxios.post<PostResponse>("/orders.json", {
        ingredientCounts,
        totalPrice,
        deliveryMethod: "fastest",
        customer: {
          name: "Amir Muhammad Hakim",
          email: "amir.muh.hakim@gmail.com",
          address: {
            street: "Unknown",
            zipCode: "123456",
            country: "Indonesia",
          },
        },
      });
      console.log(response);
    } catch (_error) {
    } finally {
      setIsLoading(false);
      setIsPurchasing(false);
    }
  }, [ingredientCounts, totalPrice]);

  let burgerBuilder: JSX.Element | null = null;
  if (isFetchIngreError) {
    burgerBuilder = (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
    );
  } else if (ingredientCounts) {
    burgerBuilder = (
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
      </>
    );
  }

  let modalChild: JSX.Element | null = null;
  if (!isLoading && ingredientCounts) {
    modalChild = (
      <OrderSummary
        ingredientCounts={ingredientCounts}
        totalPrice={totalPrice}
        onOrdered={continuePurchase}
        onOrderCanceled={cancelPurchase}
      />
    );
  }
  return (
    <>
      {burgerBuilder || <Spinner />}
      <Modal
        isDisplayed={isPurchasing}
        isLoading={isLoading}
        onClosed={cancelPurchase}
      >
        {modalChild || <Spinner />}
      </Modal>
    </>
  );
};

export default withErrorModal(BurgerBuilder, fireAxios);
