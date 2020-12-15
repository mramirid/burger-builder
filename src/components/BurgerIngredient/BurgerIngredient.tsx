import { FC } from "react";

import classes from "./BurgerIngredient.module.css";

export enum Ingredient {
  BreadBottom,
  BreadTop,
  Meat,
  Cheese,
  Salad,
  Bacon,
}

interface BurgerIngredientProps {
  type: Ingredient;
}

const BurgerIngredient: FC<BurgerIngredientProps> = (props) => {
  switch (props.type) {
    case Ingredient.BreadTop:
      return (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
    case Ingredient.BreadBottom:
      return <div className={classes.BreadBottom}></div>;
    case Ingredient.Meat:
      return <div className={classes.Meat}></div>;
    case Ingredient.Cheese:
      return <div className={classes.Cheese}></div>;
    case Ingredient.Salad:
      return <div className={classes.Salad}></div>;
    case Ingredient.Bacon:
      return <div className={classes.Bacon}></div>;
    default:
      return null;
  }
};

export default BurgerIngredient;
