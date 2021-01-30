import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers"; // Gets the State from the reducer(s)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, composeEnhancers()); // Creates the store from the State received from the reducer(s)

export default store;
