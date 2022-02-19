/* eslint-disable no-undef */
import {
  /* default as addNewData */
  organizeInitialData,
  // changeOrderWithThePrice,
  // addNewPriceToBook,
  countNewTotal,
  // reCountTotals,
  // findIndexForNewOrder,
  // delExtraOrders,
  // findPriceAndDelete,
} from "../store/addNewData";
import data from "./data";
// import dataflow from "./dataflow";

const { bookMap, bids /* asks */ } = organizeInitialData(data);

describe("countNewTotal", () => {
  test("if price index in the bids will be 0, then total = amount", () => {
    const orderList = bids;
    const desiredIndex = 0;
    const newAmount = 0.987;

    expect(countNewTotal(orderList, bookMap, desiredIndex, newAmount)).toBe(
      0.987
    );
  });
  test("if price index in the bids will be 2, it count the right way", () => {
    const orderList = bids;
    const desiredIndex = 2;
    const newAmount = 0.987;

    const prevPriceInBook = orderList[desiredIndex - 1];
    const prevTotal = bookMap[prevPriceInBook][2];
    const expected = prevTotal + newAmount;

    expect(countNewTotal(orderList, bookMap, desiredIndex, newAmount)).toBe(
      expected
    );
  });
});

describe("changeOrderWithThePrice", () => {
  test("", () => {});
});

describe("reCountTotals", () => {
  test("", () => {});
});

// if the order was closed but there's no more orders
