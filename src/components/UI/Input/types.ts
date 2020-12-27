export type InputFieldTag = "input" | "textarea" | "select";

export type InputFieldType = "text" | "email" | "password" | "number";

export interface InputFieldSelectOption<O> {
  value: O;
  displayValue: string;
}

export interface InputFieldAttrs<O = never> {
  type?: InputFieldType;
  placeholder?: string;
  options?: InputFieldSelectOption<O>[];
}

export interface InputConfig<O = never> {
  label: string;
  value: string;
  tag: InputFieldTag;
  attrs: InputFieldAttrs<O>;
}
