import React from "react";
import "./OrderRow.scss";
// import styled from "styled-components";

function OrderRow({ price, count, amount, total, side }) {
  const data = {
    price: (price / 1000).toFixed(3),
    count,
    amount: Math.abs(amount).toFixed(4),
    total: Math.abs(total).toFixed(4),
  };
  const seq = ["price", "count", "amount", "total"];

  return (
    <div className={`row ${side}`}>
      {seq.map((type, i) => (
        <div key={type + i} className={type}>
          {data[type]}
        </div>
      ))}
    </div>
  );
}

export default OrderRow;
/* 
Object.keys(myObject).map(function(key, index) {
  myObject[key] *= 2;
}); 
*/
