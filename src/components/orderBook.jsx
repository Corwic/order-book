import React from "react";
import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import ListOrders from "./ListOrders";

const Table = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

const TableSide = styled.div`
  flex-grow: 1;
  height: 445px;
  .row {
    grid-template-areas: "${(props) =>
      props["data-list"] === "asks"
        ? props["data-sequence"].split(" ").reverse().join(" ")
        : props["data-sequence"]}";
  }
  @media screen and (max-width: 640px) {
    .row {
      grid-template-areas: "${(props) =>
        props["data-list"] === "asks"
          ? props["data-sequence"]
          : props["data-sequence"]}";
    }
  }
`;

export default function OrderBookTable({ book }) {
  const { bids, asks, bookMap, depth } = book;
  const visibleBids = bids.slice(0, depth);
  const visibleAsks = asks.slice(0, depth); // .reverse()
  // const sequence = [count, amount, total, price]
  // const sequence = ["price", "count", "amount", "total"];
  const sequence = "count amount total price";

  if (!bids || !bids.length) return <div>Loading</div>;

  return (
    <Table>
      <TableSide data-list="bids" data-sequence={sequence}>
        <HeaderRow
          price="Price"
          count="Count"
          amount="Amount"
          total="Total"
          side="bids"
          sequence={sequence}
        />
        <ListOrders
          data={visibleBids}
          bookMap={bookMap}
          side="bids"
          sequence={sequence}
        />
      </TableSide>
      <TableSide data-list="asks" data-sequence={sequence}>
        <HeaderRow
          price="Price"
          count="Count"
          amount="Amount"
          total="Total"
          side="asks"
          isAsks
          sequence={sequence}
        />
        <ListOrders
          data={visibleAsks}
          bookMap={bookMap}
          side="asks"
          sequence={sequence}
        />
      </TableSide>
    </Table>
  );
}

/* function OrderBookSide({}){
  return (
    <div className={`bookTableHalf bids`}>
      <OrderRow 
        key={"headerBids"}
        price={'Price'}
        count={'Count'}
        amount={'Amount'}
        total={'Total'}
        addClass="header"
        side="bids"
      />
      <ListOrders data={visibleBids} bookMap={bookMap} side='bids'/>
    </div>
  )
} */
