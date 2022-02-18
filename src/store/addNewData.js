import { current } from "@reduxjs/toolkit";

export default function addNewData(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [ bookMap, bidsArr, asksArr, depth ] = state;

  // blank order
  if (newCount === 0) return;

  // price is out of scope`
  if (newPrice < bidsArr[depth - 1] || newPrice > asksArr[depth - 1]) {
    console.log(`${newPrice} is out of scope ${bidsArr[depth - 1]} - ${asksArr[depth - 1]}`);
    return;
  }

  const samePriceInBook = bookMap[newPrice] || null;
  let indexOfNewOrderInBook;

  // there's no such a price in the book
  if (!samePriceInBook) {
    indexOfNewOrderInBook = addNewPriceToBook(newOrder, state);
    const ba = isBidOrAsk(newAmount, 'bids', 'asks');
    console.log(
      `${newPrice} is added to the ${ba} at ${indexOfNewOrderInBook}`
    );
    // console.log('arr', bidsArr.length, asksArr.length);
    return;
  }

  // there's the price in the book
  changeOrderWithThePrice(newOrder, samePriceInBook, state);
}

function changeOrderWithThePrice(newOrder, samePriceInBook, state) {
  const [price, newCount, newAmount, newTotal] = newOrder;
  const [bookCount, bookAmount] = samePriceInBook;
  const [ bookMap, bidsArr, asksArr, ] = state;

  const bookCountWithSign = bookAmount < 0 ? -bookCount : bookCount;
  const newCountWithSign = newAmount < 0 ? -newCount : newCount;

  const countRes = bookCountWithSign + newCountWithSign;
  const amountRes = newAmount + bookAmount;

  const orderList = isBidOrAsk(bookAmount, bidsArr, asksArr);
  if (amountRes === 0 || countRes === 0) {
  //   delete bookMap[price];
  //   const index = findPriceAndDelete(price, orderList);
    console.log(`- counted Amount: ${amountRes}, counted Count: ${countRes}`);
    console.log(`- new: ${price, newCount, newAmount, newTotal}`)
    console.log(`- book: ${price, bookCount, bookAmount, bookTotal}`)
    const ba = isBidOrAsk(bookAmount, 'bids', 'asks');
    console.log(`- ${price} is deleted from ${ba} at ${index}`);
    
  //   console.log('arr', bidsArr.length, asksArr.length);
    return;
  }

  bookMap[price] = [countRes, amountRes];
}

function addNewPriceToBook(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr, depth] = state;

  const orderList = isBidOrAsk(newAmount, bidsArr, asksArr);
  const desiredIndex = findIndexForNewOrder(newPrice, newAmount, orderList)
  const newTotal = countNewTotal(orderList, bookMap, desiredIndex, newAmount)

  orderList.splice(desiredIndex, 0, newPrice);
  bookMap[newPrice] = [newCount, newAmount, newTotal]
  delExtraOrders(orderList, bookMap, depth);
  reCountTotals(orderList, desiredIndex, newTotal)

  return desiredIndex;
}

function countNewTotal(orderList, bookMap, desiredIndex, newAmount){
  const prevOrderPrice = orderList[desiredIndex - 1]
  console.log(`Looking for a prev order total from string ${desiredIndex - 1}`, current(bookMap[prevOrderPrice]));
  const prevTotal = bookMap[prevOrderPrice][2]
  return prevTotal + newAmount
}

function reCountTotals(orderList, desiredIndex, total) {
  let newTotal = total
  for (let i = desiredIndex + 1; i < orderList.length; i++) {
    const currentOrder = bookMap[orderList[i]]
    const [,amount,] = currentOrder
    newTotal += amount
    currentOrder[2] = newTotal
  }
}

function findIndexForNewOrder(newPrice, newAmount, orderList) {
  const condition = (currPrice) =>
    isBidOrAsk(newAmount, newPrice > currPrice, newPrice < currPrice);

  let desiredIndex;
  for (let i = orderList.length - 1; i >= 0; i--) {
    if (condition(orderList[i])) desiredIndex = i;
  }

  return desiredIndex
}

function delExtraOrders(orderList, bookMap, depth) {
  const limit = depth + 5;
  if (orderList.length < limit) return;
  delete bookMap[orderList[depth]];
  orderList.pop();
}

function findPriceAndDelete(price, arr) {
  const i = arr.indexOf(price);
  arr.splice(i, 1);
  return i;
}

export function isBidOrAsk(amount, bid, ask) {
  return amount > 0 ? bid : ask;
}