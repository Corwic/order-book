import React from "react";
import { useSelector } from "react-redux";
import OrderBookTable from "./components/OrderBook";
import DepthGraph from "./components/DepthGraph";

function App() {
  const book = useSelector((state) => state.orderBook);
  // const bids = [0,0,0,0]
  return (
    <div className="App">
      <header className="App-header" />
      <DepthGraph book={book} />
      <OrderBookTable book={book} />
    </div>
  );
}

export default App;
