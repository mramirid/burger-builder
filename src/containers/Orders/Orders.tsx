import { FC, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Order from "../../components/Order/Order";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchOrders } from "../../store/thunks/orders";
import { selectOrders } from "../../store/reducers/orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { HttpError } from "../../shared/types/errors";

const MySwal = withReactContent(Swal);

const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const ordersReducer = useAppSelector(selectOrders);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ordersReducer.orders.length === 0) {
      setIsLoading(true);
      dispatch(fetchOrders())
        .then(unwrapResult)
        .catch((error: HttpError) => {
          MySwal.fire(error.statusCode.toString(), error.message, "error");
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, ordersReducer.orders.length]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        ordersReducer.orders.map((order) => (
          <Order key={order.id} order={order} />
        ))
      )}
    </>
  );
};

export default Orders;
