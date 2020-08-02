import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import counter from "./state/counter";
import todoReducer from "./state/todo";
import thunk from "redux-thunk";
import movies from "./state/movies";
import shop, { toolkitReducer } from "./state/shop";
// import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const reducers = combineReducers({
  counter,
  todos: todoReducer,
  moviesReducer: movies,
  shop,
  toolkitShop: toolkitReducer
});

const logger = store => next => action => {
  console.groupCollapsed(action.type);
  console.log("prev state: ", store.getState());
  console.log("action: ", action);
  const result = next(action);
  console.log("next state: ", store.getState());
  console.groupEnd();
  return result;
};

const middleware = applyMiddleware(logger, thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(middleware);

export const store = createStore(reducers, enhancer);
window.store = store;

// export const increment = createAction("INCREMENT");
// export const decrement = createAction("DECREMENT");
// export const reset = createAction("RESET");

// const counterReducer = createReducer(0,{
//   [increment]: state => state + 1,
//   [decrement]: state => state - 1,
//   [reset]: () => 0
// })

// export const store = configureStore({
//   reducer: counterReducer
// });