import axios from "axios";

// ACTION NAMES
const FETCH = "MOVIES/FETCH";
const FETCH_SUCCESS = "MOVIES/FETCH_SUCCESS";
const FETCH_ERROR = "MOVIES/FETCH_ERROR";
const ADD = "MOVIES/ADD";
const ADD_SUCCESS = "MOVIES/ADD_SUCCESS";
const ADD_ERROR = "MOVIES/ADD_ERROR";

const URL = "http://localhost:3000/movies";

// initialState
const initialState = {
  movies: [],
  loading: false,
  adding: false,
  error: null
};

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        adding: false,
        movies: action.payload
      };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD:
      return { ...state, adding: true, error: null };
    case ADD_ERROR:
      return { ...state, adding: false, error: action.payload };
    default:
      return state;
  }
}

// Action creator
export const getMovies = () => dispatch => {
  dispatch({ type: FETCH });
  axios
    .get(URL)
    .then(({ data }) => {
      dispatch({ type: FETCH_SUCCESS, payload: data });
    })
    .catch(error => {
      dispatch({
        type: FETCH_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

export const addMovies = data => dispatch => {
  dispatch({ type: ADD });
  axios
    .post(URL, { title: data.title, genre: data.selected })
    .then(() => {
      dispatch(getMovies())
    })
    .catch(error =>
      dispatch({
        type: ADD_ERROR,
        payload: "We couldn't add your movie, please try again"
      })
    );
};
