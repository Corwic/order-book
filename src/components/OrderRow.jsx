import React from "react";
import "./OrderRow.scss";

function OrderRow({ order, side }) {
  const orderData = {
    price: (order.price / 1000).toFixed(3),
    count: order.count,
    amount: Math.abs(order.amount).toFixed(4),
    total: Math.abs(order.total).toFixed(4),
  };

  return (
    <div className={`row data ${side}`}>
      {Object.keys(orderData).map((key, i) => (
        <div key={key} className={key}>
          {orderData[key]}
        </div>
      ))}
    </div>
  );
}

export default OrderRow;
