import React, { useEffect, useState } from "react";
import "./DepthGraph.scss";
import "./OrderBook.scss";
import * as d3 from "d3";

export default function DepthGraph({ book }) {
  const [depthMax, setDepthMax] = useState([0, 0]);

  useEffect(() => {
    bids("bids", book, depthMax, setDepthMax);
    asks("asks", book, depthMax, setDepthMax);
  }, [book]);

  return (
    <div className="table depth-chart">
      <div id="bids" className="table-half bids" />
      <div id="asks" className="table-half asks" />
    </div>
  );
}

// ==================================

const widthmax = 304;
const heightmax = 431;
const barPadding = 0;
const inner = 1;
const outer = 1;
const top = 16;
const bottom = 0;

function bids(id, { bids, bookMap }, depthMax, setDepthMax = (f) => f) {
  const margin = { top, right: inner, bottom, left: outer };
  const width = widthmax - margin.left - margin.right;
  const height = heightmax - margin.top - margin.bottom;

  // append the svg object to a div ID
  document.querySelector(`#${id}`).replaceChildren();
  const svg = d3
    .select(`#${id}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const prefixSum = function (arr) {
    const builder = function (acc, n) {
      const lastNum = acc.length > 0 ? acc[acc.length - 1] : 0;
      acc.push(lastNum + n);
      return acc;
    };
    return arr.reduce(builder, []);
  };

  const data = [];
  const cumData = [];

  // create cumulative data array
  // console.log("__order_book bids", orderBook);
  for (var i = 0; i < bids.length; i++) {
    const amount = bookMap[bids[i]][1];
    cumData.push(amount);
  }
  const cum_data_array = prefixSum(cumData);

  // final data array
  for (var i = 0; i < bids.length; i++) {
    data.push({
      idx: bids[i],
      orders: cum_data_array[i],
    });
  }

  // reverse data for bids
  // data = data.reverse();

  data.forEach(function (d) {
    d.orders = +d.orders;
  });

  // set the ranges
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleBand().range([0, height]).padding(barPadding);

  // Scale the range of the data in the domains
  x.domain([
    d3.max(data, function (d) {
      const [bids, asks] = depthMax;
      if (d.orders > asks) setDepthMax([d.orders, asks]);
      // setDepthMax([d.orders, asks]);
      return bids || d.orders;
    }),
    0,
  ]);
  y.domain(
    data.map(function (d) {
      return d.idx;
    })
  );

  svg.selectAll(".bar-bids").remove("rect");

  // append the rectangles for the bar chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("class", "bar-bids")
    .attr("x", function (d) {
      return x(d.orders);
    })
    .attr("y", function (d) {
      return y(d.idx);
    })
    .attr("width", function (d) {
      return width - x(d.orders);
    })
    .attr("height", y.bandwidth());
}

function asks(id, { asks, bookMap }, depthMax, setDepthMax = (f) => f) {
  const margin = { top, right: outer, bottom, left: inner };
  const width = widthmax - margin.left - margin.right;
  const height = heightmax - margin.top - margin.bottom;

  document.querySelector(`#${id}`).replaceChildren();

  // append the svg object to a div ID
  const svg = d3
    .select(`#${id}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const prefixSum = function (arr) {
    const builder = function (acc, n) {
      const lastNum = acc.length > 0 ? acc[acc.length - 1] : 0;
      acc.push(lastNum + n);
      return acc;
    };
    return arr.reduce(builder, []);
  };

  const data = [];
  const cumData = [];

  // get the data
  // console.log("__order_book asks", orderBook);
  for (var i = 0; i < asks.length; i++) {
    const amount = -bookMap[asks[i]][1];
    cumData.push(amount);
  }

  // create cumulative data array
  const cum_data_array = prefixSum(cumData);

  // final data array
  for (var i = 0; i < asks.length; i++) {
    data.push({
      idx: asks[i],
      orders: cum_data_array[i],
    });
  }

  data.forEach(function (d) {
    d.orders = +d.orders;
  });

  // set the ranges
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleBand().range([0, height]).padding(barPadding);

  // Scale the range of the data in the domains
  x.domain([
    d3.max(data, function (d) {
      const [bids, asks] = depthMax;
      if (d.orders > bids) setDepthMax([bids, d.orders]);
      return asks;
    }),
    0,
  ]);
  y.domain(
    data.map(function (d) {
      return d.idx;
    })
  );

  svg.selectAll(".bar-asks").remove("rect");

  // append the rectangles for the bar chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("class", "bar-asks")
    .attr("x", function (d) {
      return 0; // x(d.orders);
    })
    .attr("y", function (d) {
      return y(d.idx);
    })
    .attr("width", function (d) {
      return width - x(d.orders);
    })
    .attr("height", y.bandwidth());
}
