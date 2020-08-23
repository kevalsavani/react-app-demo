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

  switch (type) {
    
    case CONST.CATEGORY.REQUEST_GET:
      return {
        ...state,
        isLoading: true
      };
    case CONST.CATEGORY.SUCCESS_DATA:
      return {
        ...state,
        isLoading: false,
        list: payload
      };
    default:
      return state;
  }

}