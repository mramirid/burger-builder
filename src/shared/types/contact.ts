import { EventHandler, FormEvent } from "react";

import { PostContact } from "./firebase";
import { InputConfig } from "./input";

export enum ContactFields {
  Name = "name",
  Email = "email",
  Street = "street",
  Country = "country",
  ZipCode = "zipCode",
  DeliveryMethod = "deliveryMethod",
}

export interface Contact extends PostContact {
  id: string;
}

export type DeliveryMethod = "" | "cheapest" | "fastest";

export interface InputContactWithConfigs {
  [ContactFields.Name]: InputConfig;
  [ContactFields.Email]: InputConfig;
  [ContactFields.Street]: InputConfig;
  [ContactFields.Country]: InputConfig;
  [ContactFields.ZipCode]: InputConfig;
  [ContactFields.DeliveryMethod]: InputConfig<DeliveryMethod>;
  [x: string]: InputConfig | InputConfig<DeliveryMethod>;
}

export type FormSubmitHandler = EventHandler<FormEvent<HTMLFormElement>>;
