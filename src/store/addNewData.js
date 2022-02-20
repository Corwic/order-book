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
  const areOrdersOnTheSameSide = Math.sign(newAmount) === Math.sign(bookAmount);

  const amountRes = newAmount + bookAmount;

  const bookCountWithSign = bookAmount < 0 ? -bookCount : bookCount;
  const newCountWithSign = newAmount < 0 ? -newCount : newCount;
  const countRes = areOrdersOnTheSameSide
    ? Math.abs(bookCountWithSign) + Math.abs(newCountWithSign)
    : bookCountWithSign + newCountWithSign;

  const index = findIndexByPrice(price, orderList);

  if (countRes <= 0) {
    const ba = isBidOrAsk(bookAmount, "bids", "asks");
    console.log(`
${price}
    - new: ${newCount}, ${newAmount}
    - book: ${bookCount}, ${bookAmount}, ${bookTotal}
    - counted Amount: ${amountRes}, counted Count: ${countRes}
    - ${countRes <= 0 ? "deleted" : "updated"} from ${ba} at ${index}`);
  }

  if (countRes <= 0) {
    deleteOrder(bookMap, orderList, price, index);
    const newTotal = countNewTotal(bookMap, orderList, index, newAmount);
    updateFollowingTotals(bookMap, orderList, index, newTotal);
    return;
  }

  const totalRes = countNewTotal(bookMap, orderList, index, newAmount);

  bookMap[price] = [countRes, amountRes, totalRes];
  updateFollowingTotals(bookMap, orderList, index, totalRes);
}

export function addOrder(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr, depth] = state;

  const orderList = isBidOrAsk(newAmount, bidsArr, asksArr);
  const desiredIndex = findIndexForNewOrder(orderList, newPrice, newAmount);
  const newTotal = countNewTotal(bookMap, orderList, desiredIndex, newAmount);

  orderList.splice(desiredIndex, 0, newPrice);
  bookMap[newPrice] = [newCount, newAmount, newTotal];
  deleteExtraOrders(bookMap, orderList, depth);
  updateFollowingTotals(bookMap, orderList, desiredIndex, newTotal);

  return desiredIndex;
}

export function countNewTotal(bookMap, orderList, index, newAmount = 0) {
  const amount = newAmount || getAmountByIndex(bookMap, orderList, index);

  if (index === 0) return amount;

  const newTotal = prevTotal(bookMap, orderList, index) + amount;
  return newTotal;
}

export function prevTotal(bookMap, orderList, index) {
  if (index === 0) return 0;
  const prevOrderPrice = orderList[index - 1];
  if (!bookMap[prevOrderPrice]) {
    console.log(`
  ${prevOrderPrice} problem.
      current price is ${orderList[index]} at ${index}`);
    debugger;
  }
  return bookMap[prevOrderPrice][2];
}

export function updateFollowingTotals(bookMap, orderList, index, total = 0) {
  let newTotal =
    total ||
    getAmountByIndex(bookMap, orderList, index) +
      prevTotal(bookMap, orderList, index);
  // eslint-disable-next-line no-plusplus
  for (let i = index + 1; i < orderList.length; i++) {
    const currentOrder = bookMap[orderList[i]];
    const [, amount] = currentOrder;
    newTotal += amount;
    currentOrder[2] = newTotal;
  }
}

export function getAmountByIndex(bookMap, orderList, index) {
  return bookMap[orderList[index]][1];
}

export function findIndexForNewOrder(orderList, newPrice, newAmount) {
  const condition = (currPrice) =>
    isBidOrAsk(newAmount, newPrice > currPrice, newPrice < currPrice);

  let desiredIndex;
  for (let i = orderList.length - 1; i >= 0; i--) {
    if (condition(orderList[i])) desiredIndex = i;
  }

  if (desiredIndex === -1) {
    console.log(
      `No index is found. New price: ${newPrice}, amount: ${newAmount}`
    );
    debugger;
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
