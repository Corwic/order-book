import React from "react";
import styled from "styled-components";
import { Row } from "./OrderRow";

const HRow = styled(Row)`
  font-weight: bold;
  color: rgb(var(--text-color-variant));
  text-transform: uppercase;

  @media screen and (max-width: 640px) {
    display: ${(props) => (props["data-side"] === "asks" ? "none" : "grid")};
  }
`;

function HeaderRow({ price, count, amount, total, side, sequence }) {
  const data = {
    price,
    count,
    amount,
    total,
  };
  const seq = ["price", "count", "amount", "total"];

  return (
    <HRow className="row header" data-side={side}>
      {seq.map((type, i) => (
        <div key={type + i} className={type}>
          {data[type]}
        </div>
      ))}
    </HRow>
  );
}

export default HeaderRow;
