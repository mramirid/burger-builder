import { FC } from "react";

import classes from "./BurgerIngredient.module.css";
import { IngredientType } from "../types";

interface BurgerIngredientProps {
  type: IngredientType;
}

const BurgerIngredient: FC<BurgerIngredientProps> = (props) => {
  switch (props.type) {
    case IngredientType.BreadTop:
      return (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
    case IngredientType.BreadBottom:
      return <div className={classes.BreadBottom}></div>;
    case IngredientType.Meat:
      return <div className={classes.Meat}></div>;
    case IngredientType.Cheese:
      return <div className={classes.Cheese}></div>;
    case IngredientType.Salad:
      return <div className={classes.Salad}></div>;
    case IngredientType.Bacon:
      return <div className={classes.Bacon}></div>;
    default:
      console.error("Unknown IngredientType!");
      return null;
  }
};

export default BurgerIngredient;
