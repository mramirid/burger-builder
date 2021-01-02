import { FC } from "react";

import classes from "./Backdrop.module.css";
import { DivClickHandler } from "../../../shared/types/events";

interface BackdropProps {
  isDisplayed: boolean;
  onClicked: DivClickHandler;
}

const Backdrop: FC<BackdropProps> = (props) => {
  return props.isDisplayed ? (
    <div className={classes.Backdrop} onClick={props.onClicked} />
  ) : null;
};

export default Backdrop;
