import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../Sagas/rootSaga";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "AsyncStorage";
import { rootReducer } from "../Reducers/rootReducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["general", ],
};
// creates the store
/* ------------- Redux Configuration ------------- */

const middleware = [];
const enhancers = [];

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, compose(...enhancers));
export const persistor = persistStore(store);

// kick off root saga
sagaMiddleware.run(rootSaga);
