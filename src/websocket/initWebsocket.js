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

        /* if (json.length) {
          console.log(`json`, [json[0], ...json[1]]);
          setBids([json[0], ...json[1]]);
        } */
      } catch (e) {
        console.log(`Error parsing : ${e.data}`);
      }
      
      switch (true) {
        case !msg.length:
          console.log('event: info/subscribed', msg);
          break;
        case msg[1].length === 50:
          console.log('bundle', msg[1]);
          break;
        case msg[1] === 'hb':
          console.log('hb', msg[1]);
          break;
        default:
          // console.log('msg', msg[0], msg[1])
      }

      // return emitter( { type: 'ACTION_TYPE', payload } )
    }
    
    return () => {
      console.log('Socket off')
      // emitter(END)
    }
  })
}