import { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import produce from "immer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { useAppDispatch, useAppSelector } from "../../../store";
import { FirePOSTOrder } from "../../../types/order";
import { validate } from "../../../utils/validation";
import {
  InputContactFields,
  FirePOSTContact,
  InputContactControls,
} from "../../../types/contact";
import {
  InputChangedEvent,
  FormSubmitHandler,
} from "../../../types/event-handlers";
import { setDidPurchase } from "../../../store/reducers/orders";
import { selectBurger } from "../../../store/reducers/burger";
import { postOrder } from "../../../store/thunks/orders";
import { HttpError } from "../../../types/errors";
import { selectUserId } from "../../../store/reducers/auth";

const MySwal = withReactContent(Swal);

const ContactData: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const burger = useAppSelector(selectBurger);

  const [isLoading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [inputContact, setInputContact] = useState<InputContactControls>({
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
          isEmail: true,
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
          isNumeric: true,
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

  const order = useCallback<FormSubmitHandler>(
    async (event) => {
      event.preventDefault();

      const submittedContact: FirePOSTContact = {
        name: "",
        email: "",
        street: "",
        zipCode: "",
        country: "",
        deliveryMethod: "",
      };
      for (const key in inputContact) {
        const fieldName = key as InputContactFields;
        submittedContact[fieldName] = inputContact[fieldName].value;
      }

      const submittedOrder: FirePOSTOrder = {
        ingredientCounts: burger.ingredientCounts!,
        totalPrice: burger.totalPrice,
        contact: submittedContact,
        userId: userId!,
      };

      setLoading(true);
      dispatch(postOrder(submittedOrder))
        .then(unwrapResult)
        .then(() => {
          dispatch(setDidPurchase(true));
          history.replace("/");
        })
        .catch((error: HttpError) => {
          MySwal.fire(error.statusCode.toString(), error.message, "error");
          setLoading(false);
        });
    },
    [
      userId,
      burger.ingredientCounts,
      burger.totalPrice,
      dispatch,
      history,
      inputContact,
    ]
  );

  const changeInput = useCallback(
    (event: InputChangedEvent, fieldName: string) => {
      setInputContact((inputContact) =>
        produce(inputContact, (inputContactDraft) => {
          const inputField = inputContactDraft[fieldName];
          inputField.value = event.target.value;
          if (inputField.validation) {
            const { isValid, errorMessages } = validate(
              event.target.value,
              inputField.validation.rules
            );
            inputField.validation.touched = true;
            inputField.validation.isValid = isValid;
            inputField.validation.errorMessages = errorMessages;
          }
          inputContactDraft[fieldName] = inputField;

          let formIsValid = true;
          for (const fieldName in inputContactDraft) {
            if (inputContactDraft[fieldName].validation) {
              formIsValid =
                inputContactDraft[fieldName].validation!.isValid && formIsValid;
            }
          }
          setFormIsValid(formIsValid);
        })
      );
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
