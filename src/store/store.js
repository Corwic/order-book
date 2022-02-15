import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import bookReducer from './bookSlice'
import websocketSagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    orderBook: bookReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(websocketSagas)