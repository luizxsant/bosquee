import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user._id) {
          const response = await userRequest.get(`orders/find/${user._id}`);
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user, user?._id]); // Adiciona user?._id como dependência

  return (
    <div>
      <h2>Seus Pedidos</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>ID do Pedido: {order._id}</p>
            {/* Adicione outras informações relevantes do pedido aqui */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
