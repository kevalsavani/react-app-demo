import { call, put, takeLatest, delay } from 'redux-saga/effects'
import CONST from '../helpers/constant';
import { 
  successCategoryData,
  errorCategoryData,
} from '../actions'

import { 
  getCategoryListAPI
} from '../api'

import { history } from '../helpers';
import { message } from 'antd';

function* getCategoryListAsync({payload}) {
  try {
    const data = yield call(getCategoryListAPI);
    if (data.status===200) {
      yield put(successCategoryData(data.payload));
    }else{
      yield put(errorCategoryData({
        message: "Error while retrieving data"
      }));
    }
  }catch (e) {
    yield put(errorCategoryData({
      message: "Error while retrieving data"
    }));
  }
}
export function* getCategoryList(action) {
  yield takeLatest(CONST.CATEGORY.REQUEST_DATA, getCategoryListAsync);
}
