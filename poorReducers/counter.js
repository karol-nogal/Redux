
function counter(state = 0, action) {
  switch(action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    case "RESET":
       state = 0
      return state
    default:
      return state
  }
}

let store = createStore(counter);
store.subscribe(() => console.log(store.getState()));
window.store = store;

store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "DECREMENT"});
store.dispatch({type: "DECREMENT"});
console.log('po operacjach', store.getState())

store.dispatch({type: "RESET"});
console.log('po resecie', store.getState())
store.getState();
