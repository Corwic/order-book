/* eslint-disable no-param-reassign */
import { createAction, createReducer, current } from "@reduxjs/toolkit";
import {
  isBidOrAsk,
  findIndexByPrice,
  findIndexForNewOrder,
} from "./addNewData";
import organizeInitialData from "./organizeInitialData";

export const fillIn = createAction("fillIn");
export const addOrder = createAction("addOrder");
export const deleteOrder = createAction("deleteOrder");

const initialState = {
  bids: [],
  asks: [],
  bookMap: {},
  depth: 25,
  toDelete: [],
};

/* function Count() {
  this.state = 0;
  this.val = function () {
    this.state += 1;
    return this.state;
  };
}
const counter = new Count();
const logData = (state, amount, type, divider) => {
  if (Number.isInteger(counter.val() / divider))
    console.log(counter.val(), amount, type, current(state[type]));
}; */

const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillIn, (state, action) => {
      const { bookMap, bids, asks } = organizeInitialData(action.payload);

      state.bookMap = { ...bookMap };
      state.bids.push(...bids);
      state.asks.push(...asks);
    })
    .addCase(addOrder, (state, action) => {
      const [price, count, amount] = action.payload;
      const type = isBidOrAsk(amount, "bids", "asks");
      if (!state.bookMap[price]) {
        const index = findIndexForNewOrder(state[type], price, amount);
        state[type].splice(index, 0, price);
      }
      state.bookMap[price] = [count, amount];
    })
    .addCase(deleteOrder, (state, action) => {
      const [price, , amount] = action.payload;
      const type = isBidOrAsk(amount, "bids", "asks");
      const index = findIndexByPrice(state[type], price);
      delete state.bookMap[price];
      state[type].splice(index, 1);
      // const list = state.toDelete;
      // logData(state, amount, type, 50);
      // list.push([price, type]);
      // while (list.length && state[type].length > state.depth) {
      //   const [delPrice, delType] = list.shift();
      //   const index = findIndexByPrice(state[type], price);
      //   delete state.bookMap[delPrice];
      //   state[delType].splice(index, 1);
      // }
    });
});

export default bookReducer;
