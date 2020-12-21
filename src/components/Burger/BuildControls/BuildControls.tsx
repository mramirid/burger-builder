import { FC, useEffect, useState } from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { IngredientCounts, IngredientType } from "../types";

type Controls = {
  label: string;
  type: IngredientType;
  isLessBtnDisabled: boolean;
}[];

interface BuildControlsProps {
  addIngredient: (type: IngredientType) => void;
  removeIngredient: (type: IngredientType) => void;
  ingredientCounts: IngredientCounts;
  totalPrice: number;
  canOrder: boolean;
}

const BuildControls: FC<BuildControlsProps> = (props) => {
  const [controls, setControls] = useState<Controls>([
    {
      label: "Salad",
      type: IngredientType.Salad,
      isLessBtnDisabled: false,
    },
    {
      label: "Bacon",
      type: IngredientType.Bacon,
      isLessBtnDisabled: false,
    },
    {
      label: "Cheese",
      type: IngredientType.Cheese,
      isLessBtnDisabled: false,
    },
    {
      label: "Meat",
      type: IngredientType.Meat,
      isLessBtnDisabled: false,
    },
  ]);

  useEffect(() => {
    setControls((controls) => {
      return controls.map((control) => ({
        ...control,
        isLessBtnDisabled: props.ingredientCounts[control.type] === 0,
      }));
    });
  }, [props.ingredientCounts]);

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          isLessBtnDisabled={control.isLessBtnDisabled}
          onIngredientAdded={() => props.addIngredient(control.type)}
          onIngredientRemoved={() => props.removeIngredient(control.type)}
        />
      ))}
      <button disabled={!props.canOrder} className={classes.OrderButton}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
