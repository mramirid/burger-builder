import { FC } from "react";

import classes from "./BuildControls.module.css";
import { IngredientType } from "../BurgerIngredient/BurgerIngredient";
import BuildControl from "./BuildControl/BuildControl";

interface Control {
  label: string;
  type: IngredientType;
}

const controls: Control[] = [
  {
    label: "Salad",
    type: IngredientType.Salad,
  },
  {
    label: "Bacon",
    type: IngredientType.Bacon,
  },
  {
    label: "Cheese",
    type: IngredientType.Cheese,
  },
  {
    label: "Meat",
    type: IngredientType.Meat,
  },
];

interface BuildControlsProps {
  onIngredientAdded: (type: IngredientType) => void;
}

const BuildControls: FC<BuildControlsProps> = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        onIngredientAdded={() => props.onIngredientAdded(control.type)}
      />
    ))}
  </div>
);

export default BuildControls;
