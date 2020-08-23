import { call, put, takeLatest, delay } from 'redux-saga/effects'
import CONST from '../helpers/constant';
import { receiveApiData } from '../actions'

import {fetchData} from '../api'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchApiData(action) {
  try {
    //yield delay(5000);
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  }catch (e) {
    console.log(e);
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}


export function* watchFetchApiData(action) {
  yield takeLatest(CONST.API.REQUEST_DATA, fetchApiData);
}