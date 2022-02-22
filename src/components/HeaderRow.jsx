import React from "react";
import "./HeaderRow.scss";
// import { Row } from "./OrderRow";

// const HRow = styled(Row)``;

function HeaderRow({ price, count, amount, total, side }) {
  const data = {
    price,
    count,
    amount,
    total,
  };
  const seq = ["price", "count", "amount", "total"];

  return (
    <div className={`row header ${side}`}>
      {seq.map((type, i) => (
        <div key={type + i} className={type}>
          {data[type]}
        </div>
      ))}
    </div>
  );
}

export default HeaderRow;
