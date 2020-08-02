import { createAction, createReducer } from "@reduxjs/toolkit";

// ACTION NAMES
const ADD_PRODUCT = "SHOP/ADD_PRODUCT";
const REMOVE_PRODUCT = "SHOP/REMOVE_PRODUCT";

// Initial State
const initialState = {
  products: []
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case REMOVE_PRODUCT:
      const index = state.products.findIndex(({ id }) => id === action.payload);
      return index === -1
        ? state
        : {
            ...state,
            products: [
              ...state.products.slice(0, index),
              ...state.products.slice(index + 1)
            ]
          };
    default:
      return state;
  }
};

// ACTION CREATORS
export const addToCart = product => ({ type: ADD_PRODUCT, payload: product });
export const removeFromCart = productId => ({
  type: REMOVE_PRODUCT,
  payload: productId
});

// TOOLKIT VERSION
export const addToCartToolkit = createAction("SHOP/ADD_PRODUCT", product => ({
  payload: product
}));
export const removeFromCartToolkit = createAction(
  REMOVE_PRODUCT,
  productId => ({
    payload: productId
  })
);

export const toolkitReducer = createReducer(initialState, {
  [addToCartToolkit]: (state, action) => ({
    ...state,
    products: [...state.products, action.payload]
  }),
  [removeFromCartToolkit]: (state, action) => {
    const index = state.products.findIndex(({ id }) => id === action.payload);
    return index === -1
      ? state
      : {
          ...state,
          products: [
            ...state.products.slice(0, index),
            ...state.products.slice(index + 1)
          ]
        };
  }
});
