import { combineReducers } from 'redux';

import data from './data'
import product from './product'
import category from './category'


export default combineReducers({
  data,
  product,
  category
});