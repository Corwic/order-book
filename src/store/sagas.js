import { call, put, take /*  takeEvery, takeLatest */ } from 'redux-saga/effects'
import initWebsocket from '../websocket/initWebsocket'

export default function* websocketSagas() {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
