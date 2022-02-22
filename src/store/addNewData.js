const priceToDelete = [];

export default function addNewData(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr] = state;

  // price is out of scope
  // if (newPrice < bidsArr[depth + 4] || newPrice > asksArr[depth + 4]) return;

  // delete order
  if (newCount === 0) {
    const orderList = isBidOrAsk(newAmount, bidsArr, asksArr);
    const index = findIndexByPrice(orderList, newPrice);
    deleteOrder(bookMap, orderList, newPrice, index);
    return;
  }

  // there's the price in the book
  if (bookMap[newPrice]) {
    updateOrder(newOrder, state);
    return;
  }

  // there's no such a price in the book
  addOrder(newOrder, state);
}

export function updateOrder(newOrder, state) {
  const [price, newCount, newAmount] = newOrder;
  const [bookMap] = state;

  bookMap[price] = [newCount, newAmount];
}

export function addOrder(newOrder, state) {
  const [newPrice, newCount, newAmount] = newOrder;
  const [bookMap, bidsArr, asksArr] = state;

  const orderList = isBidOrAsk(newAmount, bidsArr, asksArr);
  const desiredIndex = findIndexForNewOrder(orderList, newPrice, newAmount);

  orderList.splice(desiredIndex, 0, newPrice);
  bookMap[newPrice] = [newCount, newAmount];

  return desiredIndex;
}

export function deleteOrder(bookMap, orderList, price, index) {
  // eslint-disable-next-line no-param-reassign
  if (orderList.length === 30) {
    priceToDelete.push(price);
  }
  delete bookMap[price];
  orderList.splice(index, 1);

  priceToDelete.forEach((priceD, i) => {
    const index = findIndexByPrice(orderList, priceD);
    delete bookMap[priceD];
    orderList.splice(index, 1);
    priceToDelete.splice(index, 1);
  });
  priceToDelete.length = 0;
}

export function isBidOrAsk(amount, bid, ask) {
  return amount > 0 ? bid : ask;
}

export function findIndexByPrice(orderList, price) {
  const index = orderList.indexOf(price);
  return index >= 0 ? index : 0;
}

export function findIndexForNewOrder(orderList, newPrice, newAmount) {
  const condition = (currPrice) =>
    isBidOrAsk(newAmount, newPrice > currPrice, newPrice < currPrice);

  let desiredIndex;
  for (let i = orderList.length - 1; i >= 0; i--) {
    if (condition(orderList[i])) desiredIndex = i;
  }

  return desiredIndex || 0;
}
