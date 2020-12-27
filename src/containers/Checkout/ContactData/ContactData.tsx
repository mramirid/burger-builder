import { EventHandler, FC, useCallback, useState } from "react";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import fireAxios from "../../../axios/firebase/instance";
import { PostOrder, PostResponse } from "../../../axios/firebase/types";
import { InputContactWithConfigs } from "./types";
import { IngredientCounts } from "../../../components/Burger/types";
import { BtnClickEvent } from "../../../components/types";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { RouteComponentProps } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

interface ContactDataProps {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
}

const ContactData: FC<ContactDataProps & RouteComponentProps> = (props) => {
  const [inputContactConfigs] = useState<InputContactWithConfigs>({
    name: {
      value: "",
      label: "Name",
      tag: "input",
      attrs: {
        type: "text",
        placeholder: "Insert your name",
      },
    },
    email: {
      value: "",
      label: "Email",
      tag: "input",
      attrs: {
        type: "email",
        placeholder: "Insert your email",
      },
    },
    street: {
      value: "",
      label: "Street",
      tag: "input",
      attrs: {
        type: "text",
        placeholder: "Insert your street name",
      },
    },
    country: {
      value: "",
      label: "Country",
      tag: "input",
      attrs: {
        type: "text",
        placeholder: "Insert your country name",
      },
    },
    zipCode: {
      value: "",
      label: "ZIP Code",
      tag: "input",
      attrs: {
        type: "number",
        placeholder: "Insert your ZIP code",
      },
    },
    deliveryMethod: {
      value: "",
      label: "Delivery Method",
      tag: "select",
      attrs: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const order = useCallback<EventHandler<BtnClickEvent>>(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);

        const submittedOrder: PostOrder = {
          ingredientCounts: props.ingredientCounts,
          totalPrice: props.totalPrice,
          deliveryMethod: "fastest",
          contact: {
            name: "Amir Muhammad Hakim",
            email: "amir.muh.hakim@gmail.com",
            address: {
              street: "Unknown",
              zipCode: "123456",
            },
          },
        };
        const response = await fireAxios.post<PostResponse>(
          "/orders.json",
          submittedOrder
        );
        if (response.status >= 400) {
          throw new Error("Failed to POST order");
        }

        setIsLoading(false);
        props.history.replace("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [props.history, props.ingredientCounts, props.totalPrice]
  );

  let form: JSX.Element | null = null;
  if (isLoading) {
    form = <Spinner />;
  } else {
    const formInputs = Object.keys(inputContactConfigs).map((key) => {
      const inputConfig = inputContactConfigs[key];
      return (
        <Input
          key={key}
          label={inputConfig.label}
          tag={inputConfig.tag}
          attrs={inputConfig.attrs}
          value={inputConfig.value}
        />
      );
    });

    form = (
      <form>
        {formInputs}
        <Button btnType="Success" onClicked={order}>
          ORDER
        </Button>
      </form>
    );
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
