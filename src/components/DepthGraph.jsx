import React, { useEffect } from "react";
import "./DepthGraph.scss";
import "./OrderBook.scss";
import * as d3 from "d3";

export default function DepthGraph({ book }) {
  useEffect(() => {
    bids("bids", book);
    asks("asks", book);
  }, [book]);

  return (
    <div className="table">
      <div id="bids" className="depth-chart table-half" />
      <div id="asks" className="depth-chart table-half" />
    </div>
  );
}

// ==================================

const widthmax = 320;
const heightmax = 445;
const barPadding = 0;

function bids(id, { bids, bookMap }) {
  const margin = { top: 12, right: 0, bottom: 12, left: 12 };
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

  let data = [];
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
  data = data.reverse();

  // set the ranges
  const x = d3.scaleBand().range([0, width]).padding(barPadding);
  const y = d3.scaleLinear().range([height, 0]);

  data.forEach(function (d) {
    d.orders = +d.orders;
  });

  // Scale the range of the data in the domains
  x.domain(
    data.map(function (d) {
      return d.idx;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.orders;
    }),
  ]);

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
      return x(d.idx);
    })
    .attr("width", x.bandwidth())
    .attr("y", function (d) {
      return y(d.orders);
    })
    .attr("height", function (d) {
      return height - y(d.orders);
    });
}

function asks(id, { asks, bookMap }) {
  const margin = { top: 12, right: 12, bottom: 12, left: 0 };
  const width = widthmax - margin.left - margin.right;
  const height = heightmax - margin.top - margin.bottom;

  document.querySelector(`#${id}`).replaceChildren();
  // set the ranges
  const x = d3.scaleBand().range([0, width]).padding(barPadding);
  const y = d3.scaleLinear().range([height, 0]);

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

  // Scale the range of the data in the domains
  x.domain(
    data.map(function (d) {
      return d.idx;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.orders;
    }),
  ]);

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
      return x(d.idx);
    })
    .attr("width", x.bandwidth())
    .attr("y", function (d) {
      return y(d.orders);
    })
    .attr("height", function (d) {
      return height - y(d.orders);
    });
}
