import { EventHandler, MouseEvent, FormEvent, ChangeEvent } from "react";

export type BtnClickHandler = EventHandler<
  MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
>;

export type DivClickHandler = EventHandler<
  MouseEvent<HTMLDivElement, globalThis.MouseEvent>
>;

export type InputChangedEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type InputChangedHandler = EventHandler<InputChangedEvent>;

export type FormSubmitHandler = EventHandler<FormEvent<HTMLFormElement>>;
