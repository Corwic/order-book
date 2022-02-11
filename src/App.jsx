import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [bids, setBids] = useState([0])
  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
  const apiCall = {
    "event": "subscribe", 
    "channel": "book", 
    "symbol": "tBTCUSD"
  }
  wss.onopen = () => (wss.send(JSON.stringify(apiCall)))
  wss.onmessage = (msg) => {
    const json = JSON.parse(msg.data);
    try {
      if (json.length) {
        console.log(`json`, [json[0], ...json[1]]);
        setBids([json[0], ...json[1]]);
      }
    } catch (err) {
      console.log(`error`, err);
    }
  }



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
