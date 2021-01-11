import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { AppDispatch } from "../../../store";
import { logout } from "../../../store/reducers/auth";
import { clearOrders } from "../../../store/reducers/orders";

const Logout: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearOrders());
    dispatch(logout());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
