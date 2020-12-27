import { FC } from "react";

import classes from "./Input.module.css";

type InputType = "input" | "textarea";

interface InputProps {
  label: string;
  tag: InputType;
  [attributes: string]: string;
}

const Input: FC<InputProps> = (props) => {
  let inputField: JSX.Element | null = null;
  switch (props.tag) {
    case "input":
      inputField = <input className={classes.InputField} {...props} />;
      break;
    case "textarea":
      inputField = <textarea className={classes.InputField} {...props} />;
      break;
    default:
      console.error("Unknown tag");
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputField}
    </div>
  );
};

export default Input;
