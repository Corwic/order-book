/* eslint-disable no-restricted-syntax */
import React from "react";
import "./OrderBook.scss";
import HeaderRow from "./HeaderRow";
import ListOrders from "./ListOrders";
import OrderRow from "./OrderRow";
import { selectOrderByPrice, selectBookByType } from "../store/bookSlice";

export default function OrderBookTable({ book }) {
  const { bids, asks, bookMap } = book;

  return (
    <div className="table order-book">
      <HeaderRow side="bids narrow" />
      <div className="table-half bids">
        <HeaderRow side="bids" />
        {[...orders(book, "bids")]}
      </div>
      <div className="table-half asks">
        <HeaderRow side="asks" />
        {[...orders(book, "asks")]}
      </div>
    </div>
  );
}
function* orders(book, type) {
  const orderList = selectBookByType(book, type);
  let total = 0;
  for (const price of orderList) {
    const [count, amount] = selectOrderByPrice(book, price);
    total += amount;
    yield (
      <OrderRow key={price} order={[price, count, amount, total]} side={type} />
      /* <div key={price} className={`row data ${type}`}>
        <div className="price">{fixedPrice(price)}</div>
        <div className="amount">{fixedAmount(amount)}</div>
        <div className="count">{count}</div>
        <div className="total">{fixedTotal(total)}</div>
        </div> */
    );
  }
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
