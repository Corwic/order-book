import { call, put, take /*  takeEvery, takeLatest */ } from 'redux-saga/effects'
import initWebsocket from '../websocket/initWebsocket'

export default function* websocketSagas() {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

/* import { take, actionChannel } from 'redux-saga/effects'

function* watchRequests() {
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    const { payload } = yield take(requestChan)
    yield call(handleRequest, payload)
  }
}
 */