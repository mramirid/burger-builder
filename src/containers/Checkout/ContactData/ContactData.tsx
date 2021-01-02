import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import fireAxios from "../../../axios/firebase/instance";
import { RouteComponentProps } from "react-router-dom";
import {
  PostContact,
  PostOrder,
  PostResponse,
} from "../../../axios/firebase/types";
import {
  ContactFields,
  FormSubmitHandler,
  InputContactWithConfigs,
} from "./types";
import {
  InputChangedEvent,
  ValidationRules,
} from "../../../components/UI/Input/types";
import { RootState } from "../../../store";

const ContactData: FC<RouteComponentProps> = (props) => {
  const burger = useSelector((state: RootState) => state.burger);

  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [inputContact, setInputContact] = useState<InputContactWithConfigs>({
    name: {
      value: "",
      label: "Name",
      tag: "input",
      attrs: {
        type: "text",
        placeholder: "Insert your name",
      },
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
        },
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
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
        },
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
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
        },
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
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
        },
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
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
      },
    },
    deliveryMethod: {
      value: "",
      label: "Delivery Method",
      tag: "select",
      attrs: {
        options: [
          { value: "", displayValue: "Select your delivery method" },
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
        },
      },
    },
  });

  const validate = useCallback((fieldValue: string, rules: ValidationRules) => {
    let isValid = true;
    let errorMessages: string[] = [];

    if (rules.required) {
      const isNotEmpty = fieldValue.trim().length !== 0;
      isValid = isNotEmpty && isValid;
      if (!isNotEmpty) {
        errorMessages.push("This field is required");
      }
    }
    if (rules.minLength) {
      const isMinLengthSatisfied = fieldValue.trim().length >= rules.minLength;
      isValid = isMinLengthSatisfied && isValid;
      if (!isMinLengthSatisfied) {
        errorMessages.push("6 characters minimum");
      }
    }
    if (rules.maxLength) {
      const isMaxLengthSatisfied = fieldValue.trim().length <= rules.maxLength;
      isValid = isMaxLengthSatisfied && isValid;
      if (!isMaxLengthSatisfied) {
        errorMessages.push("6 character maximum");
      }
    }

    return { isValid, errorMessages };
  }, []);

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
          ingredientCounts: burger.ingredientCounts,
          totalPrice: burger.totalPrice,
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
    [burger.ingredientCounts, burger.totalPrice, inputContact, props.history]
  );

  const changeInput = useCallback(
    (event: InputChangedEvent, fieldName: string) => {
      setInputContact((inputContact) => {
        const updatedInputContact = { ...inputContact };
        const updatedInputField = { ...updatedInputContact[fieldName] };

        updatedInputField.value = event.target.value;
        if (updatedInputField.validation) {
          const { isValid, errorMessages } = validate(
            event.target.value,
            updatedInputField.validation.rules
          );
          updatedInputField.validation.touched = true;
          updatedInputField.validation.isValid = isValid;
          updatedInputField.validation.errorMessages = errorMessages;
        }
        updatedInputContact[fieldName] = updatedInputField;

        setFormIsValid(() => {
          let formIsValid = true;
          for (const fieldName in updatedInputContact) {
            const fieldValidation = updatedInputContact[fieldName].validation;
            if (fieldValidation) {
              formIsValid = fieldValidation.isValid && formIsValid;
            }
          }
          return formIsValid;
        });

        return updatedInputContact;
      });
    },
    [validate]
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
              {...inputConfig}
              onInputChanged={(event) => changeInput(event, fieldName)}
            />
          );
        })}
        <Button btnType="Success" disabled={!formIsValid}>
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
