import { ChangeEvent, EventHandler } from "react";

type InputFieldTag = "input" | "textarea" | "select";

type InputFieldType = "text" | "email" | "password" | "number";

export interface InputConfig<O = string> {
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
}

export type InputChangedEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type InputChangedHandler = EventHandler<InputChangedEvent>;
