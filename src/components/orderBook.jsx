import React from "react";
import "./OrderBook.scss";
// import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import ListOrders from "./ListOrders";

export default function OrderBookTable({ book }) {
  const { bids, asks, bookMap, depth } = book;
  const visibleBids = bids.slice(0, depth);
  const visibleAsks = asks.slice(0, depth);
  const sequence = "count amount total price";

  return (
    <div className="table">
      <div className="table-half bids">
        <HeaderRow side="bids" />
        <ListOrders
          priceList={visibleBids}
          bookMap={bookMap}
          side="bids"
          sequence={sequence}
        />
      </div>
      <div className="table-half asks">
        <HeaderRow side="asks" />
        <ListOrders
          priceList={visibleAsks}
          bookMap={bookMap}
          side="asks"
          sequence={sequence}
        />
      </div>
    </div>
  );
}
