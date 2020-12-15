import { FC } from "react";

import classes from "./Burger.module.css";
import BurgerIngredient, {
  IngredientType,
} from "./BurgerIngredient/BurgerIngredient";

export interface Ingredients {
  [IngredientType.BreadTop]: 1;
  [IngredientType.Salad]: number;
  [IngredientType.Bacon]: number;
  [IngredientType.Cheese]: number;
  [IngredientType.Meat]: number;
  [IngredientType.BreadBottom]: 1;
}

interface BurgerPropsType {
  ingredients: Ingredients;
}

const Burger: FC<BurgerPropsType> = (props) => {
  const burgerStack = Object.keys(props.ingredients)
    .map((key) => {
      const ingredient = key as IngredientType;
      const curIngredientStack: JSX.Element[] = [];
      for (let i = 0; i < props.ingredients[ingredient]; i++) {
        curIngredientStack.push(
          <BurgerIngredient key={key + i} type={ingredient} />
        );
      }
      return curIngredientStack;
    })
    .reduce((burgerStack, curIngredientStack) => {
      return burgerStack.concat(curIngredientStack);
    }, []);

  if (burgerStack.length <= 2) {
    const warnElement = <h1 key={"warn"}>Please start adding ingredients!</h1>;
    burgerStack.splice(1, 0, warnElement);
  }

  return <div className={classes.Burger}>{burgerStack}</div>;
};

export default Burger;
