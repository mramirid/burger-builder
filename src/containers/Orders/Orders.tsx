import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Order from "../../components/Order/Order";
import { fireDBAxios } from "../../axios/firebase";
import { AppDispatch, RootState } from "../../store";
import { fetchOrders } from "../../store/reducers/orders";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const ordersReducer = useSelector((state: RootState) => state.orders);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ordersReducer.orders.length === 0) {
      setIsLoading(true);
      dispatch(fetchOrders())
        .catch((error) => console.error(error.message))
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

export default withErrorModal(Orders, fireDBAxios);
