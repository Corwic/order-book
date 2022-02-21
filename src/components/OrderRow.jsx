import React from "react";
import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: right;
  width: 100%;

  .price {
    grid-area: price;
  }
  .count {
    grid-area: count;
  }
  .amount {
    grid-area: amount;
  }
  .total {
    grid-area: total;
  }
`;

function OrderRow({ price, count, amount, total, sequence }) {
  const data = {
    price: (price / 1000).toFixed(3),
    count,
    amount: Math.abs(amount).toFixed(4),
    total: Math.abs(total).toFixed(4),
  };
  const seq = ["price", "count", "amount", "total"];

  return (
    <Row className="row">
      {seq.map((type, i) => (
        <div key={type + i} className={type}>
          {data[type]}
        </div>
      ))}
    </Row>
  );
}

export default OrderRow;
/* 
Object.keys(myObject).map(function(key, index) {
  myObject[key] *= 2;
}); 
*/
