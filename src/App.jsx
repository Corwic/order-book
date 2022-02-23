import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.scss";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
import OrderBookTable from "./components/OrderBook";
import DepthGraph from "./components/DepthGraph";

function App() {
  const [reloadData, setReloadData] = useState({ bids: [] });
  const book = useSelector((state) => state);

  useLayoutEffect(() => {
    readStore();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => writeStore(e, book));
    return () => {
      window.removeEventListener("beforeunload", (e) => writeStore(e, book));
    };
  }, [book]);

  function readStore() {
    const getStore = (key, value) => window.sessionStorage.getItem(key, value);
    if (!getStore("reloaded")) return;
    setReloadData(JSON.parse(getStore("bookMap")));
    window.sessionStorage.clear();
  }

  function writeStore(e, book) {
    e.preventDefault();
    const setStore = (key, value) => window.sessionStorage.setItem(key, value);
    setStore("bookMap", JSON.stringify(book));
    setStore("reloaded", "yeap");
  }

  const isBookReady = book.bids.length;
  if (!reloadData.bids.length && !isBookReady) return <Loading />;

  return (
    <div className="App">
      <DepthGraph book={isBookReady ? book : reloadData} />
      <OrderBookTable book={isBookReady ? book : reloadData} />
    </div>
  );
}

export default App;
