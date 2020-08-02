const initialState = 0

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case "DEPOSIT":
      console.log("hejka");
      return state + action.amount;
    case "WITHDRAW":
      if (action.amount > state) {
        console.error("HEJ!");
        return state;
      }
      return state - action.amount;
    case "WITHDRAW_ALL":
      console.log('To wszystkie Twoje pieniądze', state);
      return initialState;
    default:
      return state;
  }
}

const store = createStore(bankReducer);
window.store = store;
store.subscribe(() => console.log(store.getState()));

const withdraw = amount => ({ type: "WITHDRAW", amount });
const deposit = amount => ({ type: "DEPOSIT", amount });
const withdrawAll = () => ({ type: "WITHDRAW_ALL" });
window.withdraw = withdraw;
window.deposit = deposit;
window.withdrawAll = withdrawAll;
