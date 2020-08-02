//  import { createStore } from 'redux';

const rainbow = `font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)`
const styles = "font-weight: bold; font-size: 32px";
const createNiceConsoleLog = (text) => console.log(`%c${text}`, rainbow)
createNiceConsoleLog("Welcome to my todos!!!");

// TO JEST TYLKO NA POTRZEBY POKAZANIA REDUXA BEZ JAKIEGOKOLWIEK ODZWIERCIEDLENIA NA UI

// ACTION NAME
const ADD_TODO = 'ADD_TODO';
const MARK_AS_DONE = "MARK_AS_DONE";
const REMOVE_TODO = "REMOVE_TODO";
const SHOW_ONLY_DONE = "SHOW_ONLY_DONE";
const SHOW_ONLY_UNDONE = "SHOW_ONLY_UNDONE";

// INITIAL STATE
const initialState = []

// REDUCER
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      // return state.concat({id: 1, todo: action.todo, isDone: false});
      return [...state, {id: action.id, todo: action.todo, isDone: false}];
    case MARK_AS_DONE:
      const newTodos = state.map(todo =>
        todo.id === action.id
          ? ({...todo, isDone: true})
          : todo
      );
    return newTodos;
  // TODO Sprawdzić czy z Reactem to będzie działało :)
  //   const todoToChange = state.find(todo => todo.id === action.id)
  //   console.log(todoToChange);
  //   todoToChange.isDone = true;
  //  return state
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case SHOW_ONLY_DONE:
      console.log(state.filter(todo => todo.isDone === true));
      return state
    case SHOW_ONLY_UNDONE:
        console.log(state.filter(todo => todo.isDone !== true));
        return state
    default:
      return state
  }
}

let store = createStore(todoReducer);
window.store = store;

// ACTION CREATOR
const addTodo = (todo, id) => store.dispatch({type: ADD_TODO, todo,id});
const markAsDone = (id) => store.dispatch({type: MARK_AS_DONE, id})
const removeTodo = (id) => store.dispatch({type: REMOVE_TODO, id})
const showOnlyDone = () => store.dispatch({type: SHOW_ONLY_DONE})
const showOnlyUndone = () => store.dispatch({type: SHOW_ONLY_UNDONE})

window.addTodo = addTodo;
window.markAsDone = markAsDone;
window.removeTodo = removeTodo;
window.showOnlyDone = showOnlyDone;
window.showOnlyUndone = showOnlyUndone;

store.subscribe(() => {console.log(store.getState())});