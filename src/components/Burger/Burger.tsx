import { FC } from "react";

import classes from "./Burger.module.css";
import BurgerIngredient, {
  Ingredient,
} from "../BurgerIngredient/BurgerIngredient";

const Burger: FC = () => (
  <div className={classes.Burger}>
    <BurgerIngredient type={Ingredient.BreadTop} />
    <BurgerIngredient type={Ingredient.Cheese} />
    <BurgerIngredient type={Ingredient.Meat} />
    <BurgerIngredient type={Ingredient.BreadBottom} />
  </div>
);

export default Burger;
