import React from "react";
import OrderRow from "./OrderRow";

function ListOrders({ priceList, bookMap, side }) {
  let total = 0;

  return priceList.map((orderPrice, index) => {
    // if (orderPrice.length) return <EmptyRow />;
    const [count, amount] = bookMap[orderPrice];
    total += amount;
    return (
      <OrderRow
        key={(orderPrice.toString() || 0) + index}
        order={{ price: orderPrice, count, amount, total }}
        side={side}
      />
    );
  });
}

function EmptyRow() {
  return <div className="row empty">&nbsp;</div>;
}

export default ListOrders;
