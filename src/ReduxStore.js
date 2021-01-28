import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

const LOCAL_STORAGE_NAME = "demo_data";

class ReduxStore {
  // Singleton property
  static DefaultStore = null;

  // Accessor to the default instance of this class
  static getDefaultStore() {
    if (ReduxStore.DefaultStore === null) {
      ReduxStore.DefaultStore = new ReduxStore();
    }

    return ReduxStore.DefaultStore;
  }

  // Redux store
  _store = null;

  // When class instance is used, initialize the store
  constructor() {
    this.initStore();
  }

  // Initialization of Redux Store
  initStore() {
    const middleware = applyMiddleware(thunk, logger);
    this._store = createStore(
      rootReducer,
      ReduxStore.loadState(),
      compose(
        middleware,
        // window.__REDUX_DEVTOOLS_EXTENSION__ &&
        //   window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
    this._store.subscribe(() => {
      ReduxStore.saveState(this._store.getState());
    });
  }

  // Getter to access the Redux store
  get store() {
    return this._store;
  }

  // Loading persisted state from localStorage, no need to access
  // this method from the outside
  static loadState() {
    try {
      let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);

      if (serializedState === null) {
        return ReduxStore.initialState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return ReduxStore.initialState();
    }
  }

  // Saving persisted state to localStorage every time something
  // changes in the Redux Store (This happens because of the subscribe()
  // in the initStore-method). No need to access this method from the outside
  static saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
    } catch (err) {}
  }

  // Return whatever you want your initial state to be
  static initialState() {
    return {};
  }
}

export default ReduxStore;
