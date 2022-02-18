const OrderBookTable = ({book}) => {
  const {bids, asks, bookMap, depth} = book
  const visibleBids = bids.slice(0, depth)
  const visibleAsks = asks.slice(0, depth) // .reverse()
  //const sequence = [count, amount, total, price]
  const sequence = ['Price', 'Count', 'Amount', 'Total']

  if (!bids || !bids.length) return <div>Loading</div>

  return (
    <div className="bookTable">
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
      <div className={`bookTableHalf asks`}>
        <OrderRow 
          key={"headerAsks"}
          price={'Price'}
          count={'Count'}
          amount={'Amount'}
          total={'Total'}
          addClass="header"
          side="asks"
        />
        <ListOrders data={visibleAsks} bookMap={bookMap} side='asks'/>
      </div>
    </div>
  )
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

function ListOrders({data, bookMap, side}) {
  const condition = data && data.length
  // const isThereData = arr => arr.length ? (...arr) : [0,0,0]
  
  return data.map((orderPrice, index) => {
    if (!bookMap[orderPrice]) debugger;
    return <OrderRow 
          key={(orderPrice.toString() || 0) + index} 
          price={orderPrice || 0}
          count={bookMap[orderPrice][0] || 0}
          amount={bookMap[orderPrice][1] || 0}
          total={bookMap[orderPrice][2] || ''}
          side={side}
        />
  })
}

function OrderRow({price, count, amount, total, addClass = '', side}) {
  if (isFinite(price)) price = price / 1000
  if (isFinite(amount) && amount < 0) amount = -amount

  const res = side === 'bids' 
    ? [price, count, amount, total].reverse() 
    : [price, count, amount, total]

  return (
    <div className={`bookRow ${addClass}`}>
      {res.map(value => <div>{value}</div>)}
    </div>
  )
}

export default OrderBookTable
