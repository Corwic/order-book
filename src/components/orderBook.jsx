import React from "react";
import "./OrderBook.scss";
// import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import ListOrders from "./ListOrders";

export default function OrderBookTable({ book }) {
  const { bids, asks, bookMap } = book;

  return (
    <div className="table">
      <div className="table-half bids">
        <HeaderRow side="bids" />
        <ListOrders priceList={bids} bookMap={bookMap} side="bids" />
      </div>
      <div className="table-half asks">
        <HeaderRow side="asks" />
        <ListOrders priceList={asks} bookMap={bookMap} side="asks" />
      </div>
    </div>
  );
}
