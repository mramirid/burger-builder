import { EventHandler, MouseEvent } from "react";

export type BtnClickHandler = EventHandler<
  MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
>;

export type DivClickHandler = EventHandler<
  MouseEvent<HTMLDivElement, globalThis.MouseEvent>
>;
