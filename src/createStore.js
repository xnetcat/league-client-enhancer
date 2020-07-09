import {persistReducer, persistStore} from "redux-persist";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/root";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
const store = createStore(persistReducer({
        key: 'root',
        storage: window.require("redux-persist-electron-storage")(),
        blacklist: ['plugins']
    }, rootReducer),

    composeEnhancers(applyMiddleware(thunk))
);

const persistedStore = persistStore(store)

export { store, persistedStore }