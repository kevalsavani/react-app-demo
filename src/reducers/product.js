import CONST from '../helpers/constant';

const defaultState = {
  isLoading: false,
  isDeleting: 0,
  errorMessage: '',
  successMessage: '',
  current: {},
  list: [],
  errors: [],
};

export default (state = defaultState, {type, payload}) => {
  state.errorMessage = '';
  state.successMessage = '';
  //state.isDeleting = false;

  switch (type) {
    case CONST.PRODUCT.REQUEST_DATA:
      return {
        ...state,
        isLoading: true
      };
    case CONST.PRODUCT.REQUEST_CREATE:
      return {
        ...state,
        isLoading: true
      };
    case CONST.PRODUCT.FAILED_DATA:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.message
      };
    case CONST.PRODUCT.REQUEST_GET:
      return {
        ...state,
        isLoading: true
      };
    case CONST.PRODUCT.SUCCESS_DATA:
      return {
        ...state,
        isLoading: false,
        list: payload
      };
    case CONST.PRODUCT.SUCCESS_CREATE:
      return {
        ...state,
        isLoading: false,
        successMessage: payload.message
      };  
    case CONST.PRODUCT.SUCCESS_UPDATE:
      return {
        ...state,
        isLoading: false,
        successMessage: payload.message
      };  
    case CONST.PRODUCT.SUCCESS_GET:
      return {
        ...state,
        current: payload,
        isLoading: false,
      };  
    case CONST.PRODUCT.ERROR_CREATE:
      return {
        ...state,
        errors: payload.errors,
        isLoading: false,
        errorMessage: payload.message
      };  
    case CONST.PRODUCT.ERROR_UPDATE:
      return {
        ...state,
        errors: payload.errors,
        isLoading: false,
        errorMessage: payload.message
      };  
    case CONST.PRODUCT.REQUEST_DELETE:{
      return { ...state, isDeleting: 1 };
    }
    case CONST.PRODUCT.REQUEST_DELETE_RESET:{
      return { ...state, isDeleting: 0 };
    }
    case CONST.PRODUCT.SUCCESS_DELETE:{
      return { ...state, isDeleting: 2, successMessage: payload.message };
    }
    case CONST.PRODUCT.ERROR_DELETE:{
      return { ...state, isDeleting: 3, errorMessage: payload.message };
    }
    case CONST.PRODUCT.RESET_STATE:{
      return defaultState ;
    }
    default:
      return state;
  }

}