import { FC } from "react";

import classes from "./DrawerToggle.module.css";
import { DivClickEvent } from "../../../types";

interface DrawerToggleProps {
  onClicked: (event: DivClickEvent) => void;
}

const DrawerToggle: FC<DrawerToggleProps> = (props) => (
  <div className={classes.DrawerToggle} onClick={props.onClicked}>
    <div />
    <div />
    <div />
  </div>
);

export default DrawerToggle;
