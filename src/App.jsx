import React from "react";
import "./App.scss";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
import OrderBookTable from "./components/OrderBook";
import DepthGraph from "./components/DepthGraph";

function App() {
  const book = useSelector((state) => state);

  if (!book.bids || !book.bids.length) return <Loading />;

  return (
    <div className="App">
      {/* <DepthGraph book={book} /> */}
      <OrderBookTable book={book} />
    </div>
  );
}

export default App;
