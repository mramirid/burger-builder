import { FC } from "react";
import { Redirect } from "react-router-dom";

import { getUserAuth } from "../../shared/helpers/auth-local-storage";

export default function withAuth<P extends object>(WrappedComponent: FC<P>) {
  const ComponentWithAuth: FC<P> = (props) => {
    const userAuth = getUserAuth();
    if (!!userAuth.token) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };
  return ComponentWithAuth;
}
