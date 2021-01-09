type InputFieldTag = "input" | "textarea" | "select";

type InputFieldType = "text" | "email" | "password" | "number";

export interface ValidationRules {
  required?: boolean;
  isEmail?: boolean;
  minLength?: number;
  maxLength?: number;
  isNumeric?: boolean;
}

export interface InputControl<O = string> {
  label: string;
  value: string;
  tag: InputFieldTag;
  attrs: {
    type?: InputFieldType;
    placeholder?: string;
    options?: {
      value: O;
      displayValue: string;
    }[];
  };
  validation?: {
    touched: boolean;
    isValid: boolean;
    errorMessages: string[];
    rules: ValidationRules;
  };
}
