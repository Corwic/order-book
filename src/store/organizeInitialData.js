export default function organizeInitialData(orders) {
  const ordersHalfLength = orders.length / 2;
  const bookMap = {};
  const bids = [];
  const asks = [];
  let i = 0;
  let bidTotal = 0;
  let askTotal = 0;

  while (i < ordersHalfLength) {
    const [bidPrice, bidCount, bidAmount] = orders[i];
    const [askPrice, askCount, askAmount] = orders[ordersHalfLength + i];
    bidTotal += bidAmount;
    askTotal += askAmount;

    bookMap[bidPrice] = [bidCount, bidAmount, bidTotal];
    bookMap[askPrice] = [askCount, askAmount, askTotal];
    bids.push(bidPrice);
    asks.push(askPrice);
    i++;
  }

  return { bookMap, bids, asks };
}
