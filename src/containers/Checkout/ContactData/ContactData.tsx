import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import produce from "immer";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { fireDBAxios } from "../../../axios/firebase";
import { AppDispatch, RootState } from "../../../store";
import { FirePOSTOrder } from "../../../shared/types/order";
import { validate } from "../../../shared/helpers/validation";
import {
  InputContactFields,
  FirePOSTContact,
  InputContactControls,
} from "../../../shared/types/contact";
import {
  InputChangedEvent,
  FormSubmitHandler,
} from "../../../shared/types/event-handlers";
import { postOrder, setDidPurchase } from "../../../store/reducers/orders";
import withErrorModal from "../../../hoc/withErrorModal/withErrorModal";

const ContactData: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const burger = useSelector((state: RootState) => state.burger);

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

  useEffect(() => () => {
    if (isLoading) {
      setLoading(false);
    }
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
      };

      setLoading(true);
      await dispatch(postOrder(submittedOrder));
      dispatch(setDidPurchase(true));
      history.replace("/");
    },
    [
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

export default withErrorModal(ContactData, fireDBAxios);
