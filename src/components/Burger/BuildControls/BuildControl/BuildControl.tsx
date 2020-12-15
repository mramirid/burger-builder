import { FC } from "react";

import classes from "./BuildControl.module.css";

interface BuildControlProps {
  label: string;
}

const BuildControl: FC<BuildControlProps> = (props) => (
  <div className={classes.BuildControl}>
    <p className={classes.Label}>{props.label}</p>
    <button className={classes.Less}>LESS</button>
    <button className={classes.More}>MORE</button>
  </div>
);

export default BuildControl;
