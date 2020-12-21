import { FC, MouseEvent } from "react";

import classes from "./Backdrop.module.css";

type DivClickEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

interface BackdropProps {
  isDisplayed: boolean;
  onClicked: (event: DivClickEvent) => void;
}

const Backdrop: FC<BackdropProps> = (props) =>
  props.isDisplayed ? (
    <div className={classes.Backdrop} onClick={props.onClicked} />
  ) : null;

export default Backdrop;
