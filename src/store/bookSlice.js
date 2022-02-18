import { createAction, createReducer } from "@reduxjs/toolkit";
// import fillInWithData from './fiilInWithData'
import addNewData, {isBidOrAsk} from './addNewData'

export const fillIn = createAction('fillIn')
export const addOne = createAction('addOne')

const initialState = { 
  bids: [], 
  asks: [],
  bookMap: {},
  depth: 25
}

const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillIn, (state, action) => {
      const orders = action.payload 
      const ordersLength = orders.length
      let i = 0, bidTotal = 0, askTotal = 0
      // orders.forEach((order, i) => {
      //   const [price, count, amount] = order
      //   const orderList = isBidOrAsk(amount, state.bids, state.asks)
      //   state.bookMap[price] = [count, amount]
      //   orderList.push(pomerice)
      // })
      while (i < (ordersLength / 2)) {
        const [bidPrice, bidCount, bidAmount] = orders[i]
        const [askPrice, askCount, askAmount] = orders[ordersLength - 1 - i]

        bidTotal += bidAmount
        askTotal += askAmount          

        state.bookMap[bidPrice] = [bidCount, bidAmount, bidTotal]
        state.bookMap[askPrice] = [askCount, askAmount, askTotal]
        state.bids.push(bidPrice)
        state.asks.push(askPrice)
        i++;
      }
        
      
    })
    .addCase(addOne, (state, action) => {
      const order = action.payload
      addNewData(order, [state.bookMap, state.bids, state.asks, state.depth])
      //state.bookMap[order[0]] = [order[1], order[2]]
      
      /* fnOnBidsOrAsks(
        line, 
        data => state.bids = [...state.bids, data],
        data => state.asks = [...state.asks, data]
      ) */
      /* () => state.bids = [...state.bids, line],
      () => state.asks = [...state.asks, line] */
    })
})

export default bookReducer


function splitBidsAsks(data) {
  const bids = [], asks = []
  for (let line of data) {
    fnOnBidsOrAsks(
      line, 
      data => bids.push(data), 
      data => asks.push(data)
    )
  }
  return [bids, asks]
}

function fnOnBidsOrAsks(line, fnBids, fnAsks) {
  const [price, count, amount] = line
  if (amount > 0) fnBids([price / 1000, count, amount])
  else fnAsks([price / 1000, count, amount * -1])
}

/* import { createSlice } from '@reduxjs/toolkit'

const initialState = { bids: [] }

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    fillIn: (state, action) => {
      state.bids = [...state.bids, ...action.payload]
    },
  }
})

// Action creators are generated for each case reducer function
export const { fillIn } = bookSlice.actions

export default bookSlice.reducer */







/*     bids: (state, action) => {
      state.value.bids.concat(action.payload)
    },
    asks: (state) => {
      state.value.asks.concat(action.payload)
    } */

    /*   reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  }, */