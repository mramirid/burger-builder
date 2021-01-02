import { FC } from "react";

import classes from "./DrawerToggle.module.css";
import { DivClickHandler } from "../../../../shared/types/events";

interface DrawerToggleProps {
  onClicked: DivClickHandler;
}

const DrawerToggle: FC<DrawerToggleProps> = (props) => (
  <div className={classes.DrawerToggle} onClick={props.onClicked}>
    <div />
    <div />
    <div />
  </div>
);

export default DrawerToggle;
