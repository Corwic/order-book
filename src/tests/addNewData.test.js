/* eslint-disable no-undef */
import organizeInitialData from "../store/organizeInitialData";

import { findIndexForNewOrder } from "../store/addNewData";
import data from "./data";

const { bids, asks } = organizeInitialData(data);

describe("findIndexForNewOrder", () => {
  test(`Find a right position in bids. Should be 4`, () => {
    const [newPriceInBids, , newAmountInBids] = [43559, 1, 2.2573604];
    // console.log(bids, bids.indexOf(43560));
    const expected = 21; // bids.indexOf(43560);

    expect(findIndexForNewOrder(bids, newPriceInBids, newAmountInBids)).toBe(
      expected
    );
  });

  test(`Find a right position in asks. Should be 7`, () => {
    const [newPriceInAsks, , newAmountInAsks] = [43598, 1, -0.19209693];
    // console.log(asks, asks.indexOf(43599));
    const expected = 7; // asks.indexOf(43599);

    expect(findIndexForNewOrder(asks, newPriceInAsks, newAmountInAsks)).toBe(
      expected
    );
  });
});
