import React from "react";
import "./OrderBook.scss";
// import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import ListOrders from "./ListOrders";

export default function OrderBookTable({ book }) {
  const { bids, asks, bookMap, depth } = book;
  const visibleBids = bids.slice(0, depth);
  const visibleAsks = asks.slice(0, depth); // .reverse()
  // const sequence = [count, amount, total, price]
  // const sequence = ["price", "count", "amount", "total"];
  const sequence = "count amount total price";

  if (!bids || !bids.length) return <div>Loading</div>;

  return (
    <div className="table">
      <div className="table-half bids" data-sequence={sequence}>
        <HeaderRow
          price="Price"
          count="Count"
          amount="Amount"
          total="Total"
          side="bids"
          sequence={sequence}
        />
        <ListOrders
          data={visibleBids}
          bookMap={bookMap}
          side="bids"
          sequence={sequence}
        />
      </div>
      <div className="table-half asks" data-sequence={sequence}>
        <HeaderRow
          price="Price"
          count="Count"
          amount="Amount"
          total="Total"
          side="asks"
          isAsks
          sequence={sequence}
        />
        <ListOrders
          data={visibleAsks}
          bookMap={bookMap}
          side="asks"
          sequence={sequence}
        />
      </div>
    </div>
  );
}

/* function OrderBookSide({}){
  return (
    <div className={`bookTableHalf bids`}>
      <OrderRow 
        key={"headerBids"}
        price={'Price'}
        count={'Count'}
        amount={'Amount'}
        total={'Total'}
        addClass="header"
        side="bids"
      />
      <ListOrders data={visibleBids} bookMap={bookMap} side='bids'/>
    </div>
  )
} */
