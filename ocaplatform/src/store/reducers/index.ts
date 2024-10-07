import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";

const reducers = combineReducers({
    loading
})

const rootReducer = (state: any, action: any) => {
    return reducers(state, action);
}

export default rootReducer;