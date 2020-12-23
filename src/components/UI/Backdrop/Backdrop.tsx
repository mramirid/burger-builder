import { FC } from "react";

import classes from "./Backdrop.module.css";
import { DivClickEvent } from "../../types";

interface BackdropProps {
  isDisplayed: boolean;
  onClicked: (event: DivClickEvent) => void;
}

const Backdrop: FC<BackdropProps> = (props) =>
  props.isDisplayed ? (
    <div className={classes.Backdrop} onClick={props.onClicked} />
  ) : null;

export default Backdrop;
