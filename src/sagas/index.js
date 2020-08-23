import { all, fork } from 'redux-saga/effects'
import * as userSaga from './users';
import * as productSaga from './product';
import * as categorySaga from './category';

export default function* rootSaga() {
  yield all([
    ...Object.values(userSaga),
    ...Object.values(productSaga),
    ...Object.values(categorySaga)
  ].map(fork));
}