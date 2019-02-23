import { combineReducers, createStore, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storageSession from "redux-persist/lib/storage/session";
import pollReducer from "./reducers/pollReducer";
import adminReducer from "./reducers/adminReducer";
import authReducer from "./reducers/authReducer";

const rootPersistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["auth", "admin"]
};

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  blacklist: ["message", "loading", "error"]
};

const adminPersistConfig = {
  key: "admin",
  storage: storageSession,
  blacklist: ["candidate", "committee"]
};

const rootReducer = combineReducers({
  form: formReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  poll: pollReducer,
  admin: persistReducer(adminPersistConfig, adminReducer)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(persistedReducer);

export const persistor = persistStore(store);
