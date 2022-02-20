// import { current } from "@reduxjs/toolkit";

export default function addNewData(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr, depth] = state;

  // blank order
  if (newCount === 0) return;

  // price is out of scope`
  if (newPrice < bidsArr[depth - 1] || newPrice > asksArr[depth - 1]) return;

  // there's the price in the book
  const samePriceInBook = bookMap[newPrice] || null;
  if (samePriceInBook) {
    updateOrder(newOrder, samePriceInBook, state);
    console.log(`${newPrice} is changed`);
    return;
  }

  // there's no such a price in the book
  const indexOfNewOrderInBook = addOrder(newOrder, state);
  const ba = isBidOrAsk(newAmount, "bids", "asks");
  console.log(`${newPrice} is added to the ${ba} at ${indexOfNewOrderInBook}`);
}

export function updateOrder(newOrder, samePriceInBook, state) {
  const [price, newCount, newAmount] = newOrder;
  const [bookCount, bookAmount, bookTotal] = samePriceInBook;
  const [bookMap, bidsArr, asksArr] = state;
  const orderList = isBidOrAsk(bookAmount, bidsArr, asksArr);

  const bookCountWithSign = bookAmount < 0 ? -bookCount : bookCount;
  const newCountWithSign = newAmount < 0 ? -newCount : newCount;
  const index = findIndexByPrice(price, orderList);

  const countRes = bookCountWithSign + newCountWithSign;
  const amountRes = newAmount + bookAmount;
  const totalRes = countNewTotal(bookMap, orderList, newAmount, index);

  if (amountRes <= 0 || countRes <= 0) {
    deleteOrder(bookMap, orderList, price, index);
    updateFollowingTotals(bookMap, orderList, index, totalRes);
    const ba = isBidOrAsk(bookAmount, "bids", "asks");
    console.log(`- counted Amount: ${amountRes}, counted Count: ${countRes}
      - new: ${price}, ${newCount}, ${newAmount}
      - book: ${price}, ${bookCount}, ${bookAmount}, ${bookTotal}
      - ${price} is deleted from ${ba} at ${index}`);
    return;
  }

  bookMap[price] = [countRes, amountRes, totalRes];
  updateFollowingTotals(bookMap, orderList, index, totalRes);
}

export function addOrder(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr, depth] = state;

  const orderList = isBidOrAsk(newAmount, bidsArr, asksArr);
  const desiredIndex = findIndexForNewOrder(orderList, newPrice, newAmount);
  const newTotal = countNewTotal(bookMap, orderList, newAmount, desiredIndex);

  orderList.splice(desiredIndex, 0, newPrice);
  bookMap[newPrice] = [newCount, newAmount, newTotal];
  deleteExtraOrders(bookMap, orderList, depth);
  updateFollowingTotals(bookMap, orderList, desiredIndex, newTotal);

  return desiredIndex;
}

export function countNewTotal(bookMap, orderList, newAmount, index) {
  if (index === 0) return newAmount;

  const res = prevTotal(bookMap, orderList, index) + newAmount;
  if (res < 0)
    console.log(`${orderList[index]}. index: ${index}, newTotal: ${res}`);
  return res;
}

export function prevTotal(bookMap, orderList, index) {
  if (index === 0) return 0;
  const prevOrderPrice = orderList[index - 1];
  return bookMap[prevOrderPrice][2];
}

export function updateFollowingTotals(bookMap, orderList, index) {
  let newTotal =
    prevTotal(bookMap, orderList, index) + bookMap[orderList[index]][1];
  // eslint-disable-next-line no-plusplus
  for (let i = index + 1; i < orderList.length; i++) {
    const currentOrder = bookMap[orderList[i]];
    const [, amount] = currentOrder;
    newTotal += amount;
    currentOrder[2] = newTotal;
  }
}

export function findIndexForNewOrder(orderList, newPrice, newAmount) {
  const condition = (currPrice) =>
    isBidOrAsk(newAmount, newPrice > currPrice, newPrice < currPrice);

  let desiredIndex;
  for (let i = orderList.length - 1; i >= 0; i--) {
    if (condition(orderList[i])) desiredIndex = i;
  }

  return desiredIndex;
}

export function deleteExtraOrders(bookMap, orderList, depth) {
  const limit = depth + 5;
  if (orderList.length < limit) return;
  // eslint-disable-next-line no-param-reassign
  const lastOrderIndex = limit - 1;
  const price = orderList[lastOrderIndex];
  deleteOrder(bookMap, orderList, price, lastOrderIndex);
}

export function deleteOrder(bookMap, orderList, price, index) {
  // eslint-disable-next-line no-param-reassign
  delete bookMap[price];
  orderList.splice(index, 1);
}

export function findIndexByPrice(price, arr) {
  return arr.indexOf(price);
}

export function isBidOrAsk(amount, bid, ask) {
  return amount > 0 ? bid : ask;
}
