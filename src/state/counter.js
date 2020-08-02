// ACTION NAMES
const INCREMENT = "COUNTER/INCREMENT";
const DECREMENT = "COUNTER/DECREMENT";
const RESET = "COUNTER/RESET";

// initialState
const initialState = 0

// REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case INCREMENT: {
      return state + 1
    }
    case DECREMENT: {
      return state - 1
    }
    case RESET: {
      return initialState
    }
    default:
      return state
  }
}

//ACTION CREATORS
export const increment = () => ({type: INCREMENT })

export const asyncIncrement = () => (dispatch) => {
  setTimeout(() => {
    dispatch({type: INCREMENT });
  }, 3000);
}

export const decrement = () => ({type: DECREMENT})
export const reset = () => ({type: RESET})