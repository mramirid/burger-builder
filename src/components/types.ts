import { MouseEvent } from "react";

/*
 * React Click Events
 */

export type BtnClickEvent = MouseEvent<
  HTMLButtonElement,
  globalThis.MouseEvent
>;

export type DivClickEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;
