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
