import { FC } from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { IngredientType, IngredientCounts } from "./types";

interface BurgerProps {
  ingredientCounts: IngredientCounts;
}

const Burger: FC<BurgerProps> = (props) => {
  const burgerStack = Object.keys(props.ingredientCounts)
    .map((key) => {
      const type = key as IngredientType;
      const curIngredientStack: JSX.Element[] = [];
      for (let i = 0; i < props.ingredientCounts[type]; i++) {
        curIngredientStack.push(<BurgerIngredient key={key + i} type={type} />);
      }
      return curIngredientStack;
    })
    .flat();

  if (burgerStack.length <= 2) {
    const warnElement = <h1 key={"warn"}>Please start adding ingredients!</h1>;
    burgerStack.splice(1, 0, warnElement);
  }

  return <div className={classes.Burger}>{burgerStack}</div>;
};

export default Burger;
