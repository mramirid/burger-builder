import { FC, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAppDispatch } from "../../../store";
import { logout } from "../../../store/reducers/auth";
import { clearOrders } from "../../../store/reducers/orders";

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearOrders());
    dispatch(logout());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
