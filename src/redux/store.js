import { applyMiddleware, legacy_createStore as createStore,compose } from "redux";
import reducer from "./reducer";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuring Redux Persist with the storage mechanism (localStorage)
const persistConfig = {
    key: 'root',  // The key for storing the state in local storage
    storage,   
    
  }

  // Creating a persisted reducer to keep the state in sync with local storage
const persistedReducer = persistReducer(persistConfig, reducer);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Creating the Redux store with the persisted reducer and middleware (thunk for async actions)
export const store = createStore(
    persistedReducer,          // Reducer with persistence
    composeEnhancers(applyMiddleware(thunk))     // Apply the redux-thunk middleware for async actions
  );
  
  // Persistor to manage and rehydrate the store from the persisted state
  export const persistor = persistStore(store);
