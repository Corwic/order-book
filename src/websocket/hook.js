import { useState } from "react";

const useWebsocket = () => {
  const [bids, setBids] = useState([0])
  // const [wsOpen, setWsOpen] = useState(false)
  
  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
  const apiCall = {
    "event": "subscribe", 
    "channel": "book", 
    "symbol": "tBTCUSD"
  }
  wss.onopen = () => (wss.send(JSON.stringify(apiCall)))
  wss.onmessage = (msg) => {
    const json = JSON.parse(msg.data)
    try {
      if (json.length) {
        console.log(`json`, [json[0], ...json[1]]);
        setBids([json[0], ...json[1]]);
      }
    } catch (err) {
      console.log(`error`, err);
    }
  }
  return bids
}

export default useWebsocket