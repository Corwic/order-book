import { eventChannel, END } from 'redux-saga'

export default function initWebsocket() {
  return eventChannel( emitter => {
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2') 
    const apiCall = {
      "event": "subscribe", 
      "channel": "book", 
      "symbol": "tBTCUSD"
    }

    ws.onopen = () => (ws.send(JSON.stringify(apiCall)))
    ws.onmessage = e => {
      let msg = null
      try {
        msg = JSON.parse(e.data)
      } catch (e) {
        console.log(`Error parsing : ${e.data}`);
      }
      
      if (!msg.length) { 
        console.log('event: info/subscribed', msg)
        return
      }

      let [/* channel */, data] = msg

      switch (true) {
        case data.length === 50:
          console.log('bundle', data);
          return emitter( { type: 'fillIn', payload: data } )          
          // break;
        case data === 'hb':
          // console.log('hb', msg[1]);
          break;
        default:
          let [price, count, amount] = data
          let style = 'color: cyan'
          if (amount < 0) style = 'color: pink'
          // console.log(`%c price ${price}, count ${count}, amount ${amount}`, style)
      }

      // return emitter( { type: 'ACTION_TYPE', payload } )
    }
    
    return () => {
      console.log('Socket off')
      // emitter(END)
    }
  })
}
