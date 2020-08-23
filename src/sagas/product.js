import { call, put, takeLatest, delay } from 'redux-saga/effects'
import CONST from '../helpers/constant';
import { 
  successProductData,
  errorProductData,
  successProductCreate,
  errorProductCreate,
  successProductGet,
  errorProductGet,
  successProductUpdate,
  errorProductUpdate,
  successProductDelete,
  errorProductDelete
} from '../actions'

import { 
  getProductListAPI, 
  createProductListAPI, 
  getSingleProductAPI,
  updateProductAPI,
  deleteProductAPI
} from '../api'

import { history } from '../helpers';
import { message } from 'antd';

function* getProductListAsync({payload}) {
  try {
    const data = yield call(getProductListAPI, payload);
    if (data.status===200) {
      yield put(successProductData(data.payload));
    }else{
      yield put(errorProductData({
        message: "Error while retrieving data"
      }));
    }
  }catch (e) {
    yield put(errorProductData({
      message: "Error while retrieving data"
    }));
  }
}
export function* getProductList(action) {
  yield takeLatest(CONST.PRODUCT.REQUEST_DATA, getProductListAsync);
}

function* createProductAsync({payload}) {
  try {
    const data = yield call(createProductListAPI, payload);
    if (data.status===200) {
      yield put(successProductCreate({
        errors: data.payload,
        message: 'Produces created successfully'
      }));
    }else{
      yield put(errorProductCreate({
        errors: data.payload,
        message: 'Unable to save data, Please correct form values'
      }));
    }
  }catch (e) {
    yield put(errorProductCreate({
      errors: [],
      message: 'Fatal error while saving data'
    }));
  }
}
export function* createProduct(action) {
  yield takeLatest(CONST.PRODUCT.REQUEST_CREATE, createProductAsync);
}

function* getSingleProductAsync({payload}) {
  try {

    const data = yield call(getSingleProductAPI, payload);
    if (data.status===200) {
      yield put(successProductGet(data.payload));
    }else{
      message.error(data.message);
      history.push('/products');
    }
  }catch (e) {
    yield put(errorProductGet({
      errors: [],
      message: 'Fatal error while getting data'
    }));
  }
}
export function* getSingleProduct(action) {
  yield takeLatest(CONST.PRODUCT.REQUEST_GET, getSingleProductAsync);
}

function* updateProductAsync({id, payload}) {
  try {
    const data = yield call(updateProductAPI,id, payload);
    if (data.status===200) {
      yield put(successProductUpdate({
        errors: data.payload,
        message: 'Produces updated successfully'
      }));
    }else{
      yield put(errorProductUpdate({
        errors: data.payload,
        message: 'Unable to update data, Please correct form values'
      }));
    }
  }catch (e) {
    yield put(errorProductUpdate({
      errors: [],
      message: 'Fatal error while updating data'
    }));
  }
}
export function* updateProduct(action) {
  yield takeLatest(CONST.PRODUCT.REQUEST_UPDATE, updateProductAsync);
}

function* deleteProductAsync({payload}) {
  try {
    const data = yield call(deleteProductAPI,payload);
    if (data.status===200) {
      yield put(successProductDelete({
        message: data.message,
      }));
    }else{
      yield put(errorProductDelete({
        message: data.message,
      }));
    }
  }catch (e) {
    yield put(errorProductDelete({
      message: 'Fatal error while deleting data'
    }));
  }
}
export function* deleteProduct(action) {
  yield takeLatest(CONST.PRODUCT.REQUEST_DELETE, deleteProductAsync);
}