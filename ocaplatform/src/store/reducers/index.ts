import { combineReducers } from "@reduxjs/toolkit";
import countriesOptions from "./countriesOptions";
import goto from "./goto";
import loading from "./loading";
import timezonesOptions from "./timezonesOptions";

const reducers = combineReducers({
  loading,
  goto,
  countriesOptions,
  timezonesOptions,
});

const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};

export default rootReducer;
