import { FC } from "react";

import classes from "./Button.module.css";
import { BtnClickHandler } from "../../../shared/types/events";

interface ButtonProps {
  btnType: "Danger" | "Success";
  disabled?: boolean;
  onClicked?: BtnClickHandler;
}

const Button: FC<ButtonProps> = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    disabled={props.disabled}
    onClick={props.onClicked}
  >
    {props.children}
  </button>
);

export default Button;
