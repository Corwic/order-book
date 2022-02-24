/* eslint-disable no-param-reassign */
import { createAction, createReducer, current } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
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
  // toDelete: [],
};

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

const selectBookMap = (state) => state.bookMap;
const selectOrderList = (state) => state;

const selectType = (state, type) => type;
const selectPrice = (state, price) => price;

export const selectBookByType = createSelector(
  [selectOrderList, selectType],
  (orderList, type) => orderList[type]
);

export const selectOrderByPrice = createSelector(
  [selectBookMap, selectPrice],
  (bookMap, price) => bookMap[price]
);

export default bookReducer;
