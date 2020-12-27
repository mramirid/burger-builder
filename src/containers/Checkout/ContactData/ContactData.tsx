import { FC, useCallback, useState } from "react";

import classes from "./ContactData.module.css";
import {
  PostContact,
  PostOrder,
  PostResponse,
} from "../../../axios/firebase/types";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import fireAxios from "../../../axios/firebase/instance";
import {
  ContactFields,
  FormSubmitHandler,
  InputContactWithConfigs,
} from "./types";
import { IngredientCounts } from "../../../components/Burger/types";
import { RouteComponentProps } from "react-router-dom";
import { InputChangedEvent } from "../../../components/UI/Input/types";

interface ContactDataProps {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
}

const ContactData: FC<ContactDataProps & RouteComponentProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputContact, setInputContact] = useState<InputContactWithConfigs>({
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
        placeholder: "Select your delivery method",
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
    },
  });

  const order = useCallback<FormSubmitHandler>(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);

        const submittedContact: PostContact = {
          name: "",
          email: "",
          street: "",
          zipCode: "",
          country: "",
          deliveryMethod: "",
        };
        for (const key in inputContact) {
          const fieldName = key as ContactFields;
          submittedContact[fieldName] = inputContact[fieldName].value;
        }

        const submittedOrder: PostOrder = {
          ingredientCounts: props.ingredientCounts,
          totalPrice: props.totalPrice,
          contact: submittedContact,
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
    [inputContact, props]
  );

  const changeInput = useCallback(
    (event: InputChangedEvent, fieldName: string) => {
      setInputContact((inputContact) => {
        const updatedInputContact = { ...inputContact };
        const updatedInputField = { ...updatedInputContact[fieldName] };
        updatedInputField.value = event.target.value;
        updatedInputContact[fieldName] = updatedInputField;
        return updatedInputContact;
      });
    },
    []
  );

  let form: JSX.Element | null = null;
  if (isLoading) {
    form = <Spinner />;
  } else {
    form = (
      <form onSubmit={order}>
        {Object.keys(inputContact).map((fieldName) => {
          const inputConfig = inputContact[fieldName];
          return (
            <Input
              key={fieldName}
              label={inputConfig.label}
              tag={inputConfig.tag}
              attrs={inputConfig.attrs}
              value={inputConfig.value}
              onInputChanged={(event) => changeInput(event, fieldName)}
            />
          );
        })}
        <Button btnType="Success">ORDER</Button>
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
