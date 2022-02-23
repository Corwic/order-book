/* eslint-disable consistent-return */
import { eventChannel } from "redux-saga";

export default function initWebsocket() {
  return eventChannel((emitter) => {
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    const apiCall = {
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
    };
    ws.onopen = () => ws.send(JSON.stringify(apiCall));
    ws.onmessage = (e) => {
      let msg = null;
      try {
        msg = JSON.parse(e.data);
      } catch (err) {
        console.log(`Error parsing : ${err.data}`);
      }

      if (!msg.length) {
        console.log("event: info/subscribed", msg);
        return;
      }

      const [, /* channel */ data] = msg;

      switch (true) {
        case data.length === 50:
          return emitter({ type: "fillIn", payload: data });
        case data === "hb":
          break;
        case data[1] === 0: // data = [price, count, amount]
          // console.log(data);
          return emitter({ type: "deleteOrder", payload: data });
        default:
          return emitter({ type: "addOrder", payload: data });
      }
    };

    return () => {
      console.log("Socket off");
      // emitter(END)
    };
  });
}
