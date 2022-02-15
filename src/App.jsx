import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import useWebsocket from './websocket/hook'

function App() {
  // const [bids] = useWebsocket()
  const dispatch = useDispatch()
  // dispatch({type: 'fillIn', payload: 'test'})
  const bids = useSelector(state => state.bids)
  console.log(bids);
  //const bids = [0,0,0,0]
  return (
    <div className="App">
      <header className="App-header">
        <div className="bidRow">
          <div>Total</div>
          <div>Price</div> 
          <div>Count</div>
          <div>Amount</div>
          <div>Total</div>
          <div>Price</div> 
          <div>Count</div>
          <div>Amount</div>
        </div>
        <div className="bidRow">
          {/* bids.length && bids.map(line => {
              (<>
                <div>{0}</div>
                <div>{line[0]}</div> 
                <div>{line[1]}</div>
                <div>{line[2]}</div>
              </>)
          })
           */}
        </div>
      </header>
    </div>
  )
}

export default App
