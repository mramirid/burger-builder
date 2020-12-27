import { FC, useEffect, useState } from "react";

import Order from "../../components/Order/Order";
import fireAxios from "../../axios/firebase/instance";
import { GetOrders } from "../../axios/firebase/types";
import { IOrder } from "../../components/Order/types";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";

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
    <div>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default withErrorModal(Orders, fireAxios);
