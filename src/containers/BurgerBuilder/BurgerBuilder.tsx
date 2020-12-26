import { FC, useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  IngredientCounts,
  IngredientType,
} from "../../components/Burger/types";
import fireAxios, { GetIngredientCounts } from "../../axios/firebase";
import { INGREDIENT_PRICES } from "../../components/Burger/constants";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";

const BurgerBuilder: FC<RouteComponentProps> = (props) => {
  const [
    ingredientCounts,
    setIngredientCounts,
  ] = useState<IngredientCounts | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasable, setPurchasable] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isFetchIngreError, setIsFetchIngreError] = useState(false);

  const togglePurchasable = useCallback(
    (ingredientCounts: IngredientCounts) => {
      const totalCounts = Object.keys(ingredientCounts)
        .map((key) => ingredientCounts[key as IngredientType])
        .reduce((sum, curCount) => sum + curCount, 0);
      setPurchasable(totalCounts > 2);
    },
    []
  );

  useEffect(() => {
    fireAxios
      .get<GetIngredientCounts>("/ingredients.json")
      .then((response) => {
        const loadedIngreCounts = {
          breadTop: 1,
          ...response.data,
          breadBottom: 1,
        };

        const totalPrice = Object.keys(loadedIngreCounts)
          .map((key) => {
            const type = key as IngredientType;
            return INGREDIENT_PRICES[type] * loadedIngreCounts[type];
          })
          .reduce((sum, curPrice) => sum + curPrice, 0);

        setIngredientCounts(() => {
          setTotalPrice(totalPrice);
          togglePurchasable(loadedIngreCounts);
          return loadedIngreCounts;
        });
      })
      .catch(() => setIsFetchIngreError(true));
  }, [togglePurchasable]);

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
    // try {
    //   setIsLoading(true);
    //   const response = await fireAxios.post<PostResponse>("/orders.json", {
    //     ingredientCounts,
    //     totalPrice,
    //     deliveryMethod: "fastest",
    //     customer: {
    //       name: "Amir Muhammad Hakim",
    //       email: "amir.muh.hakim@gmail.com",
    //       address: {
    //         street: "Unknown",
    //         zipCode: "123456",
    //         country: "Indonesia",
    //       },
    //     },
    //   });
    //   console.log(response);
    // } catch (_error) {
    // } finally {
    //   setIsLoading(false);
    //   setIsPurchasing(false);
    // }
    let queryParams: string[] = [];
    if (ingredientCounts) {
      queryParams = Object.keys(ingredientCounts).map((key) => {
        const type = key as IngredientType;
        return (
          encodeURIComponent(type) +
          "=" +
          encodeURIComponent(ingredientCounts[type])
        );
      });
    }
    props.history.push({
      pathname: "/checkout",
      search: "?" + queryParams.join("&"),
    });
  }, [props.history, ingredientCounts]);

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
