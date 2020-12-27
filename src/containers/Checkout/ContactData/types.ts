import { InputConfig } from "../../../components/UI/Input/types";

export interface Contact {
  name: string;
  email: string;
  address: {
    street: string;
    zipCode: string;
  };
}

export type DeliveryMethod = "cheapest" | "fastest";

export interface InputContactWithConfigs {
  name: InputConfig;
  email: InputConfig;
  street: InputConfig;
  country: InputConfig;
  zipCode: InputConfig;
  deliveryMethod: InputConfig<DeliveryMethod>;
  [x: string]: InputConfig | InputConfig<DeliveryMethod>;
}
