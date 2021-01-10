import { FC, useEffect, useState } from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { IngredientCounts, IngredientType } from "../../../shared/types/burger";
import { BtnClickHandler } from "../../../shared/types/event-handlers";

type Controls = {
  label: string;
  type: IngredientType;
  isLessBtnDisabled: boolean;
}[];

interface BuildControlsProps {
  isAuthenticated: boolean;
  ingredientCounts: IngredientCounts;
  totalPrice: number;
  purchasable: boolean;
  addIngredient: (type: IngredientType) => void;
  removeIngredient: (type: IngredientType) => void;
  onOrder: BtnClickHandler;
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
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable || !props.isAuthenticated}
        onClick={props.onOrder}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN IN TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
