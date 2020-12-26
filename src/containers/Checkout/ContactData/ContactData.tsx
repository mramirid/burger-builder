import { EventHandler, FC, useCallback, useState } from "react";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import fireAxios, { PostOrder, PostResponse } from "../../../axios/firebase";
import { Contact } from "./types";
import { IngredientCounts } from "../../../components/Burger/types";
import { BtnClickEvent } from "../../../components/types";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { RouteComponentProps } from "react-router-dom";

interface ContactDataProps {
  ingredientCounts: IngredientCounts;
  totalPrice: number;
}

const ContactData: FC<ContactDataProps & RouteComponentProps> = (props) => {
  const [contact] = useState<Contact>({
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
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
    form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="zip-code" placeholder="Zip Code" />
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
