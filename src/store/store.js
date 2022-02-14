import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import bidsSlice from './bidsSlice'
import websocketSagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    bids: bidsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(websocketSagas)