import { FC } from "react";

import classes from "./BuildControls.module.css";
import { IngredientType } from "../BurgerIngredient/BurgerIngredient";
import BuildControl from "./BuildControl/BuildControl";

export type Controls = {
  label: string;
  type: IngredientType;
  isLessBtnDisabled: boolean;
}[]

interface BuildControlsProps {
  addIngredient: (type: IngredientType) => void;
  removeIngredient: (type: IngredientType) => void;
  controls: Controls;
}

const BuildControls: FC<BuildControlsProps> = (props) => (
  <div className={classes.BuildControls}>
    {props.controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        isLessBtnDisabled={control.isLessBtnDisabled}
        onIngredientAdded={() => props.addIngredient(control.type)}
        onIngredientRemoved={() => props.removeIngredient(control.type)}
      />
    ))}
  </div>
);

export default BuildControls;
