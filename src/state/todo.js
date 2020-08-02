import uid from "uid";

// ACTION NAMES
const ADD = "TODO/ADD";
const TOGGLE_DONE = "TODO/TOGGLE_DONE";
const REMOVE_SELECTED = "TODO/REMOVE_SELECTED"

// initialState
const initialState = [];

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: uid(5),
          title: action.payload,
          isDone: false
        }
      ];
    case TOGGLE_DONE:
      return state.map(todo =>
        todo.id === action.payload
          ? {
              ...todo,
              isDone: !todo.isDone
            }
          : todo
      );
    case REMOVE_SELECTED:
      return state.filter(todo => !action.payload.includes(todo.id))
    default:
      return state;
  }
}

// ACTION CREATOR
export const addTodo = text => ({ type: ADD, payload: text });
export const toggleDone = todoId => ({ type: TOGGLE_DONE, payload: todoId });
export const removeSelected = todoIds => ({ type: REMOVE_SELECTED, payload: todoIds})