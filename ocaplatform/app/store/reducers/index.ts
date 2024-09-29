import { combineReducers } from '@reduxjs/toolkit';
import detailJobSlice from './detailJob';

const rootReducer = combineReducers({
  detailJob: detailJobSlice,
});

export default rootReducer;
