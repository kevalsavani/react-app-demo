import CONST from '../helpers/constant';

const defaultState = {isLoading: true};

export default (state = defaultState, {type, payload}) => {

  switch (type) {
    case CONST.API.REQUEST_DATA:
      return { isLoading: true, ...payload };
    case CONST.API.RECEIVE_DATA:
      return { ...payload};
    default:
      return state;
  }

}