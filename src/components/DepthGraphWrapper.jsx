import React from "react";
import { useSelector } from "react-redux";
import DepthGraph from "./DepthGraph";

export default function DepthGraphWrapper({ data }) {
  console.log("bids", data);

  return <DepthGraph data={data} />;
}
