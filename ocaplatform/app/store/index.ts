import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { loadState } from "../utils/localStorage";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const composeEnchancers = compose;

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const persistedState = loadState();
  return {
    ...createStore(
      rootReducer,
      persistedState,
      composeEnchancers(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

const store = configureStore();

export default store;
