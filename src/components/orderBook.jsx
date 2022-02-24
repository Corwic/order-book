/* eslint-disable no-restricted-syntax */
import React from "react";
import "./OrderBook.scss";
import HeaderRow from "./HeaderRow";
import OrderRow from "./OrderRow";
import { selectOrderByPrice, selectBookByType } from "../store/bookSlice";

export default function OrderBookTable({ book }) {
  const orders = function* (type) {
    const orderList = selectBookByType(book, type);
    let total = 0;
    for (const price of orderList) {
      const [count, amount] = selectOrderByPrice(book, price);
      total += amount;
      yield (
        <OrderRow
          key={price}
          order={[price, count, amount, total]}
          side={type}
        />
      );
    }
  };

  return (
    <div className="table order-book">
      <HeaderRow side="bids narrow" />
      <div className="table-half bids">
        <HeaderRow side="bids" />
        {[...orders("bids")]}
      </div>
      <div className="table-half asks">
        <HeaderRow side="asks" />
        {[...orders("asks")]}
      </div>
    </div>
  );
}
