import { FC } from "react";

import classes from "./Input.module.css";
import { InputConfig } from "./types";

interface InputProps extends InputConfig<unknown> {}

const Input: FC<InputProps> = (props) => {
  let inputField: JSX.Element | null = null;
  switch (props.tag) {
    case "input":
      inputField = (
        <input
          className={classes.InputField}
          value={props.value}
          {...props.attrs}
        />
      );
      break;
    case "textarea":
      inputField = (
        <textarea
          className={classes.InputField}
          value={props.value}
          {...props.attrs}
        />
      );
      break;
    case "select":
      inputField = (
        <select className={classes.InputField} value={props.value}>
          {props.attrs.options!.map((option) => (
            <option key={option.value as string} value={option.value as string}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
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
