import React, { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import produce from "immer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import classes from "./Auth.module.css";
import { InputAuthControls, InputAuthPayload } from "../../types/auth";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  FormSubmitHandler,
  InputChangedEvent,
} from "../../types/event-handlers";
import { validate } from "../../utils/validation";
import { signIn, signUp } from "../../store/thunks/auth";
import { useAppDispatch } from "../../store";
import { HttpError } from "../../types/errors";

const MySwal = withReactContent(Swal);

const Auth: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [inputAuth, setInputAuth] = useState<InputAuthControls>({
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
          isEmail: true,
        },
      },
    },
    password: {
      value: "",
      label: "Password",
      tag: "input",
      attrs: {
        type: "password",
        placeholder: "Insert your password",
      },
      validation: {
        touched: false,
        isValid: false,
        errorMessages: [],
        rules: {
          required: true,
          minLength: 6,
        },
      },
    },
  });

  const changeInput = useCallback(
    (event: InputChangedEvent, fieldName: string) => {
      setInputAuth((inputAuth) =>
        produce(inputAuth, (inputAuthDraft) => {
          const inputField = inputAuthDraft[fieldName];
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
          inputAuthDraft[fieldName] = inputField;

          let formIsValid = true;
          for (const fieldName in inputAuthDraft) {
            if (inputAuthDraft[fieldName].validation) {
              formIsValid =
                inputAuthDraft[fieldName].validation!.isValid && formIsValid;
            }
          }
          setFormIsValid(formIsValid);
        })
      );
    },
    []
  );

  const submit = useCallback<FormSubmitHandler>(
    (event) => {
      event.preventDefault();
      setLoading(true);

      const inputAuthPayload: InputAuthPayload = {
        email: inputAuth.email.value,
        password: inputAuth.password.value,
      };

      if (isSignUp) {
        dispatch(signUp(inputAuthPayload))
          .then(unwrapResult)
          .then((_result) => history.replace("/"))
          .catch((rejectedValue: HttpError) => {
            MySwal.fire(
              rejectedValue.statusCode.toString(),
              rejectedValue.message,
              "error"
            );
            setLoading(false);
          });
      } else {
        dispatch(signIn(inputAuthPayload))
          .then(unwrapResult)
          .then((_result) => history.replace("/"))
          .catch((rejectedValue: HttpError) => {
            MySwal.fire(
              rejectedValue.statusCode.toString(),
              rejectedValue.message,
              "error"
            );
            setLoading(false);
          });
      }
    },
    [
      dispatch,
      history,
      inputAuth.email.value,
      inputAuth.password.value,
      isSignUp,
    ]
  );

  let form: JSX.Element | null = null;
  if (!isLoading) {
    form = (
      <form onSubmit={submit}>
        {Object.keys(inputAuth).map((fieldName) => {
          const inputConfig = inputAuth[fieldName];
          return (
            <Input
              key={fieldName}
              {...inputConfig}
              onInputChanged={(event) => changeInput(event, fieldName)}
            />
          );
        })}
        <Button btnType="Success" disabled={!formIsValid}>
          SUBMIT
        </Button>
      </form>
    );
  }

  return (
    <div className={classes.Auth}>
      <h4>
        Enter your email and password to {isSignUp ? "Sign Up" : "Sign In"}
      </h4>
      {form || <Spinner />}
      <Button btnType="Danger" onClicked={() => setIsSignUp(!isSignUp)}>
        SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};

export default Auth;
