

const OrderBookTable = ({book}) => {
  const {bids, asks} = book
  const depth = 25
  const visibleBids = bids.slice(0, depth)
  const visibleAsks = asks.slice(0, depth).reverse()
  
  return (
    <div className="bookTable">
      <OrderBookTableHalf data={visibleBids} side='bids'/>
      <OrderBookTableHalf data={visibleAsks} side='asks'/>
    </div>
  )
}

function OrderBookTableHalf({data, side}) {
  return (
    <div className={`bookTableHalf ${side}`}>
      <OrderRow 
        order={['Price', 'Count', 'Amount', 'Total']}
        addClass="header"
      />

      {data && data.length ? data.map(order => 
        <OrderRow 
          key={order.join('-')} 
          order={order}
        />
        ) : null
      }
    </div>
  )
}

function OrderRow({order, addClass = ''}) {
  const [price, count, amount, total] = order
  // isNumber = val => Number.isFinite(price) ? price / 1000 : price;

  return (
    <div className={`bookRow ${addClass}`}>
      <div>{price}</div>
      <div>{count}</div>
      <div>{amount}</div>
      <div>{total}</div>
    </div>
  )
}

export default OrderBookTable
