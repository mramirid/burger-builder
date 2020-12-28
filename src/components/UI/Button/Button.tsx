import { FC } from "react";

import classes from "./Button.module.css";
import { BtnClickEvent } from "../../types";

interface ButtonProps {
  btnType: "Danger" | "Success";
  disabled?: boolean;
  onClicked?: (event: BtnClickEvent) => void;
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
