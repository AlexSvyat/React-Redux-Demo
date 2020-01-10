import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case types.DELETE_AUTHOR_OPTIMISTIC:
      return state.filter(author => author.id !== action.author.id);
    case types.UPDATE_AUTHOR_SUCCESS:
      // Map return a new array. We're replacing the element
      // with mathcing author.id
      return state.map(author =>
        author.id === action.author.id ? action.author : author
      );
    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    default:
      return state;
  }
}
