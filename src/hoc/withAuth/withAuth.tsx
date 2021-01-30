import { FC } from "react";
import { Redirect } from "react-router-dom";

import authLocalStorage from "../../shared/helpers/auth-local-storage";

export default function withAuth<P>(WrappedComponent: FC<P>) {
  const ComponentWithAuth: FC<P> = (props) => {
    const userAuth = authLocalStorage.getUserAuth();
    if (!!userAuth.token) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };
  return ComponentWithAuth;
}
