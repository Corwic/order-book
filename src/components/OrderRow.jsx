import React from "react";
import "./OrderRow.scss";

export default function OrderRow({ order, side }) {
  const [price, count, amount, total] = order;
  const fixedPrice = (price) => (price / 1000).toFixed(3);
  const fixedAmount = (amount) => Math.abs(amount).toFixed(4);
  const fixedTotal = (total) => Math.abs(total).toFixed(4);

  return (
    <div className={`row data ${side}`}>
      <div className="price">{fixedPrice(price)}</div>
      <div className="amount">{fixedAmount(amount)}</div>
      <div className="count">{count}</div>
      <div className="total">{fixedTotal(total)}</div>
    </div>
  );
}
