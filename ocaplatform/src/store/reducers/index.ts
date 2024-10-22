import { combineReducers } from "@reduxjs/toolkit";
import countriesOptions from "./countriesOptions";
import goto from "./goto";
import loading from "./loading";

const reducers = combineReducers({
    loading,
    goto,
    countriesOptions,
})

const rootReducer = (state: any, action: any) => {
    return reducers(state, action);
}

export default rootReducer;