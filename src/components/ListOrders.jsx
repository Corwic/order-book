import React from "react";
import OrderRow from "./OrderRow";

function ListOrders({ data, bookMap, side, sequence }) {
  const condition = data && data.length;
  // const isThereData = arr => arr.length ? (...arr) : [0,0,0]

  return data.map((orderPrice, index) => {
    if (orderPrice.length) return <EmptyRow />;
    return (
      <OrderRow
        key={(orderPrice.toString() || 0) + index}
        price={orderPrice || 0}
        count={bookMap[orderPrice][0] || 0}
        amount={bookMap[orderPrice][1] || 0}
        total={bookMap[orderPrice][2] || ""}
        side={side}
        sequence={sequence}
      />
    );
  });
}

function EmptyRow() {
  return <div className="row empty">&nbsp;</div>;
}

export default ListOrders;
