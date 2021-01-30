import { ValidationRules } from "../types/input";

export const validate = (fieldValue: string, rules: ValidationRules) => {
  let isValid = true;
  let errorMessages: string[] = [];

  fieldValue = fieldValue.trim();

  if (rules.required) {
    const isNotEmpty = fieldValue.length !== 0;
    isValid = isNotEmpty && isValid;
    if (!isNotEmpty) {
      errorMessages.push("This field is required");
    }
  }
  if (rules.minLength) {
    const isMinLengthSatisfied = fieldValue.length >= rules.minLength;
    isValid = isMinLengthSatisfied && isValid;
    if (!isMinLengthSatisfied) {
      errorMessages.push("6 characters minimum");
    }
  }
  if (rules.maxLength) {
    const isMaxLengthSatisfied = fieldValue.length <= rules.maxLength;
    isValid = isMaxLengthSatisfied && isValid;
    if (!isMaxLengthSatisfied) {
      errorMessages.push("6 character maximum");
    }
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const isEmail = pattern.test(fieldValue);
    isValid = isEmail && isValid;
    if (!isEmail) {
      errorMessages.push("Must be a valid email");
    }
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    const isNumeric = pattern.test(fieldValue);
    isValid = isNumeric && isValid;
    if (!isNumeric) {
      errorMessages.push("Must be numeric characters");
    }
  }

  return { isValid, errorMessages };
};
