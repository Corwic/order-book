import { createAction, createReducer } from "@reduxjs/toolkit";

export const fillIn = createAction('fillIn')
export const addOne = createAction('addOne')

const initialState = { 
  bids: [], 
  asks: []
}

const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillIn, (state, action) => {
      const [bids, asks] = splitBidsAsks(action.payload)
      state.bids = [...state.bids, ...bids]
      state.asks = [...state.asks, ...asks]
    })
    .addCase(addOne, (state, action) => {
      const line = action.payload
      checkIdBidsOrAsks(
        line, 
        () => state.bids = [...state.bids, line],
        () => state.asks = [...state.asks, line]
      )
    })
})

export default bookReducer


function splitBidsAsks(data) {
  const bids = [], asks = []
  for (let line of data) {
    checkIdBidsOrAsks(
      line, 
      data => bids.push(data), 
      data => asks.push(data)
    )
  }
  return [bids, asks]
}

function checkIdBidsOrAsks(line, fnBids, fnAsks) {
  const [price, count, amount] = line
  if (amount > 0) fnBids(line)
  else fnAsks([price, count, amount * -1])
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