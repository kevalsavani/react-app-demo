import CONST from '../helpers/constant';

export const requestApiData = () => ({type:CONST.API.REQUEST_DATA, payload: {}});
export const receiveApiData = data => ({type:CONST.API.RECEIVE_DATA, payload: data});


// Products

export const resetProductState = () => ({type:CONST.PRODUCT.RESET_STATE});

export const requestProductData = (data = {}) => ({type:CONST.PRODUCT.REQUEST_DATA, payload: data});
export const successProductData = data => ({type:CONST.PRODUCT.SUCCESS_DATA, payload: data});
export const errorProductData = data => ({type:CONST.PRODUCT.FAILED_DATA, payload: data});

export const requestProductCreate = (data) => ({type:CONST.PRODUCT.REQUEST_CREATE, payload: data});
export const successProductCreate = data => ({type:CONST.PRODUCT.SUCCESS_CREATE, payload: data});
export const errorProductCreate = data => ({type:CONST.PRODUCT.ERROR_CREATE, payload: data});

export const requestProductGet = id => ({type:CONST.PRODUCT.REQUEST_GET, payload: id});
export const successProductGet = data => ({type:CONST.PRODUCT.SUCCESS_GET, payload: data});
export const errorProductGet = data => ({type:CONST.PRODUCT.ERROR_GET, payload: data});

export const requestProductUpdate = (id, data) => ({type:CONST.PRODUCT.REQUEST_UPDATE, id, payload: data});
export const successProductUpdate = data => ({type:CONST.PRODUCT.SUCCESS_UPDATE, payload: data});
export const errorProductUpdate = data => ({type:CONST.PRODUCT.ERROR_UPDATE, payload: data});

export const requestProductDelete = id => ({type:CONST.PRODUCT.REQUEST_DELETE, payload: id});
export const requestProductDeleteReset = () => ({type:CONST.PRODUCT.REQUEST_DELETE_RESET});
export const successProductDelete = data => ({type:CONST.PRODUCT.SUCCESS_DELETE, payload: data});
export const errorProductDelete = data => ({type:CONST.PRODUCT.ERROR_DELETE, payload: data});


// Categories

export const requestCategoryData = (data = {}) => ({type:CONST.CATEGORY.REQUEST_DATA, payload: data});
export const successCategoryData = data => ({type:CONST.CATEGORY.SUCCESS_DATA, payload: data});
export const errorCategoryData = data => ({type:CONST.CATEGORY.FAILED_DATA, payload: data});
