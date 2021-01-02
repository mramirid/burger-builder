import { FC, useEffect, useState } from "react";

import Order from "../../components/Order/Order";
import fireAxios from "../../axios/firebase";
import { GetOrders } from "../../shared/types/firebase";
import { IOrder } from "../../shared/types/order";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders: FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fireAxios
      .get<GetOrders>("/orders.json")
      .then((response) => {
        const fetchedOrders: IOrder[] = [];
        for (const orderId in response.data) {
          fetchedOrders.push({
            id: orderId,
            ...response.data[orderId],
          });
        }
        setOrders(fetchedOrders);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        orders.map((order) => <Order key={order.id} order={order} />)
      )}
    </>
  );
};

export default withErrorModal(Orders, fireAxios);
