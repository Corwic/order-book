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
  const [price, newCount, newAmount, newTotal] = newOrder;
  const [bookCount, bookAmount, bookTotal] = samePriceInBook;
  const [bookMap, bidsArr, asksArr] = state;
  const orderList = isBidOrAsk(bookAmount, bidsArr, asksArr);

  const bookCountWithSign = bookAmount < 0 ? -bookCount : bookCount;
  const newCountWithSign = newAmount < 0 ? -newCount : newCount;
  const index = findIndexByPrice(price, orderList);

  const countRes = bookCountWithSign + newCountWithSign;
  const amountRes = newAmount + bookAmount;
  const totalRes = countNewTotal(orderList, bookMap, index, newAmount);

  if (amountRes <= 0 || countRes <= 0) {
    deleteOrder(bookMap, price, orderList, index);
    reCountTotals(bookMap, orderList, index, totalRes);
    const ba = isBidOrAsk(bookAmount, "bids", "asks");
    console.log(`- counted Amount: ${amountRes}, counted Count: ${countRes}
      - new: ${(price, newCount, newAmount, newTotal)}
      - book: ${(price, bookCount, bookAmount, bookTotal)}
      - ${price} is deleted from ${ba} at ${index}`);
    return;
  }
  bookMap[price] = [countRes, amountRes, totalRes];
  reCountTotals(bookMap, orderList, index, totalRes);
}

export function deleteOrder(bookMap, price, orderList, index) {
  // eslint-disable-next-line no-param-reassign
  delete bookMap[price];
  orderList.splice(index, 1);
}

export function addOrder(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr, depth] = state;

  const orderList = isBidOrAsk(newAmount, bidsArr, asksArr);
  const desiredIndex = findIndexForNewOrder(newPrice, newAmount, orderList);
  const newTotal = countNewTotal(orderList, bookMap, desiredIndex, newAmount);

  orderList.splice(desiredIndex, 0, newPrice);
  bookMap[newPrice] = [newCount, newAmount, newTotal];
  deleteExtraOrders(orderList, bookMap, depth);
  reCountTotals(bookMap, orderList, desiredIndex, newTotal);

  return desiredIndex;
}

export function countNewTotal(orderList, bookMap, desiredIndex, newAmount) {
  if (desiredIndex === 0) return newAmount;

  const prevOrderPrice = orderList[desiredIndex - 1];
  const prevTotal = bookMap[prevOrderPrice][2];
  const res = prevTotal + newAmount;
  if (res < 0)
    console.log(
      `${orderList[desiredIndex]}. index: ${desiredIndex}, newTotal: ${res}`
    );
  return res;
}

export function reCountTotals(bookMap, orderList, desiredIndex, total) {
  let newTotal = total;
  // eslint-disable-next-line no-plusplus
  for (let i = desiredIndex + 1; i < orderList.length; i++) {
    const currentOrder = bookMap[orderList[i]];
    const [, amount] = currentOrder;
    newTotal += amount;
    currentOrder[2] = newTotal;
  }
}

export function findIndexForNewOrder(newPrice, newAmount, orderList) {
  const condition = (currPrice) =>
    isBidOrAsk(newAmount, newPrice > currPrice, newPrice < currPrice);

  let desiredIndex;
  for (let i = orderList.length - 1; i >= 0; i--) {
    if (condition(orderList[i])) desiredIndex = i;
  }

  return desiredIndex;
}

export function deleteExtraOrders(orderList, bookMap, depth) {
  const limit = depth + 5;
  if (orderList.length < limit) return;
  // eslint-disable-next-line no-param-reassign
  delete bookMap[orderList[depth]];
  orderList.pop();
}

export function findIndexByPrice(price, arr) {
  return arr.indexOf(price);
}

export function isBidOrAsk(amount, bid, ask) {
  return amount > 0 ? bid : ask;
}
