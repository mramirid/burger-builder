import { FC } from "react";

import classes from "./BuildControl.module.css";

interface BuildControlProps {
  label: string;
  isLessBtnDisabled: boolean;
  onIngredientAdded: () => void;
  onIngredientRemoved: () => void;
}

const BuildControl: FC<BuildControlProps> = (props) => (
  <div className={classes.BuildControl}>
    <p className={classes.Label}>{props.label}</p>
    <button
      className={classes.Less}
      onClick={props.onIngredientRemoved}
      disabled={props.isLessBtnDisabled}
    >
      LESS
    </button>
    <button className={classes.More} onClick={props.onIngredientAdded}>
      MORE
    </button>
  </div>
);

export default BuildControl;
