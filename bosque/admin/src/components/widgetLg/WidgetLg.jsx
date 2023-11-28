import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      // Make a request to update the order status
      await userRequest.put(`orders/${orderId}`, { status: newStatus });

      // Update the local state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const StatusSelect = ({ currentStatus, orderId }) => {
    const statusOptions = ["pendente", "em preparo", "a caminho", "entregue"];

    const handleStatusChange = (event) => {
      const selectedStatus = event.target.value;
      updateStatus(orderId, selectedStatus);
    };

    return (
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className="statusSelect"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Ultimos pedidos</h3>
      <table className="widgetLgTable">
        <thead>
          <tr>
            <th>cliente</th>
            <th>data</th>
            <th>quantia</th>
            <th>endereço</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.userId}</td>
              <td>{format(order.createdAt)}</td>
              <td>R${order.amount}</td>
              <td>{order.address}</td>
              <td>
                <StatusSelect currentStatus={order.status} orderId={order._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
