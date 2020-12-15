import { FC } from "react";

import classes from "./Burger.module.css";
import BurgerIngredient, {
  IngredientType,
} from "../BurgerIngredient/BurgerIngredient";

const Burger: FC = () => (
  <div className={classes.Burger}>
    <BurgerIngredient type={IngredientType.BreadTop} />
    <BurgerIngredient type={IngredientType.Cheese} />
    <BurgerIngredient type={IngredientType.Meat} />
    <BurgerIngredient type={IngredientType.BreadBottom} />
  </div>
);

export default Burger;
