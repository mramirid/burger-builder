import { FC } from "react";

import classes from "./Input.module.css";
import { InputControl } from "../../../types/input";
import { InputChangedHandler } from "../../../types/event-handlers";

interface InputProps extends InputControl {
  onInputChanged: InputChangedHandler;
}

const Input: FC<InputProps> = (props) => {
  const inputFieldClasses = [classes.InputField];
  let errorMessages: JSX.Element | null = null;
  if (
    props.validation &&
    !props.validation.isValid &&
    props.validation.touched
  ) {
    inputFieldClasses.push(classes.Invalid);
    errorMessages = (
      <p className={classes.ErrorMessages}>
        {props.validation.errorMessages.join(" | ")}
      </p>
    );
  }

  let inputField: JSX.Element | null = null;
  switch (props.tag) {
    case "input":
      inputField = (
        <input
          className={inputFieldClasses.join(" ")}
          value={props.value}
          {...props.attrs}
          onChange={props.onInputChanged}
        />
      );
      break;
    case "textarea":
      inputField = (
        <textarea
          className={inputFieldClasses.join(" ")}
          value={props.value}
          {...props.attrs}
          onChange={props.onInputChanged}
        />
      );
      break;
    case "select":
      inputField = (
        <select
          className={inputFieldClasses.join(" ")}
          onChange={props.onInputChanged}
          defaultValue={props.value}
        >
          {props.attrs.options!.map((option) => (
            <option key={option.value} value={option.value}>
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
      {errorMessages}
    </div>
  );
};

export default Input;
