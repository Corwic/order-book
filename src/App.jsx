import { useSelector } from 'react-redux'
import './App.css'
import OrderBookTable from './components/orderBook'
// import useWebsocket from './websocket/hook'

function App() {
  const book = useSelector(state => state.orderBook)
  //const bids = [0,0,0,0]
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <OrderBookTable book={book} />
    </div>
  )
}

export default App
