/* eslint-disable no-undef */
import organizeInitialData from "../store/organizeInitialData";

import {
  /* default as addNewData */
  // changeOrderWithThePrice,
  // addNewPriceToBook,
  countNewTotal,
  // reCountTotals,
  findIndexForNewOrder,
  // delExtraOrders,
  // findPriceAndDelete,
} from "../store/addNewData";
import data from "./data";
// import dataflow from "./dataflow";

const { bookMap, bids, asks } = organizeInitialData(data);

describe("countNewTotal", () => {
  test("index = 0, total should be equal amount", () => {
    const orderList = bids;
    const desiredIndex = 0;
    const newAmount = 0.987;

    expect(countNewTotal(orderList, bookMap, desiredIndex, newAmount)).toBe(
      0.987
    );
  });
  test("index = 2, total should be 1.04714881", () => {
    const orderList = bids;
    const desiredIndex = 2;
    const newAmount = 0.987;

    const prevPriceInBook = orderList[desiredIndex - 1];
    const prevTotal = bookMap[prevPriceInBook][2];
    const expected = prevTotal + newAmount; // 1.04714881

    expect(countNewTotal(orderList, bookMap, desiredIndex, newAmount)).toBe(
      expected
    );
  });
});

describe("findIndexForNewOrder", () => {
  test(`Find a right position in bids. Should be 4`, () => {
    const [newPriceInBids, , newAmountInBids] = [43559, 1, 2.2573604];
    // console.log(bids, bids.indexOf(43560));
    const expected = 21; // bids.indexOf(43560);

    expect(findIndexForNewOrder(newPriceInBids, newAmountInBids, bids)).toBe(
      expected
    );
  });

  test(`Find a right position in asks. Should be 7`, () => {
    const [newPriceInAsks, , newAmountInAsks] = [43598, 1, -0.19209693];
    // console.log(asks, asks.indexOf(43599));
    const expected = 7; // asks.indexOf(43599);

    expect(findIndexForNewOrder(newPriceInAsks, newAmountInAsks, asks)).toBe(
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
