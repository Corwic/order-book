import React from "react";
import "./OrderRow.scss";

export default function OrderRow({ order, side }) {
  const [price, count, amount, total] = order;

  return (
    <div className={`row data ${side}`}>
      <div className="price">{fixedPrice(price)}</div>
      <div className="amount">{fixedAmount(amount)}</div>
      <div className="count">{count}</div>
      <div className="total">{fixedTotal(total)}</div>
    </div>
  );
}

function fixedPrice(price) {
  return (price / 1000).toFixed(3);
}
function fixedAmount(amount) {
  return Math.abs(amount).toFixed(4);
}
function fixedTotal(total) {
  return Math.abs(total).toFixed(4);
}
