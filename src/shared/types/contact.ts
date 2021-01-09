import { InputControl } from "./input";

export enum InputContactFields {
  Name = "name",
  Email = "email",
  Street = "street",
  Country = "country",
  ZipCode = "zipCode",
  DeliveryMethod = "deliveryMethod",
}

type DeliveryMethod = "" | "cheapest" | "fastest";

export interface InputContactControls {
  [InputContactFields.Name]: InputControl;
  [InputContactFields.Email]: InputControl;
  [InputContactFields.Street]: InputControl;
  [InputContactFields.Country]: InputControl;
  [InputContactFields.ZipCode]: InputControl;
  [InputContactFields.DeliveryMethod]: InputControl<DeliveryMethod>;

  [x: string]: InputControl | InputControl<DeliveryMethod>;
}

export interface FirePOSTContact {
  [InputContactFields.Name]: string;
  [InputContactFields.Email]: string;
  [InputContactFields.Street]: string;
  [InputContactFields.Country]: string;
  [InputContactFields.ZipCode]: string;
  [InputContactFields.DeliveryMethod]: string;
}

export interface Contact extends FirePOSTContact {
  id: string;
}
