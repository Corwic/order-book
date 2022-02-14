import { useState } from 'react'
import './App.css'
import useWebsocket from './websocket/hook'

function App() {
  // const [bids] = useWebsocket()
  const bids = [0,0,0,0]
  return (
    <div className="App">
      <header className="App-header">
        <div className="bidRow">
          <div>Total</div>
          <div>Price</div> 
          <div>Count</div>
          <div>Amount</div>
        </div>
        <div className="bidRow">
          <div>{bids[0]}</div>
          <div>{bids[1] > 0 ? bids[1]/1000 : 0}</div> 
          <div>{bids[2]}</div>
          <div>{bids[3]}</div>
        </div>
      </header>
    </div>
  )
}

export default App
