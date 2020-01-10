import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function deleteAuthorOptimistic(author) {
  return { type: types.DELETE_AUTHOR_OPTIMISTIC, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        // To handle error state in Redux Store
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteAuthor(author) {
  return function(dispatch) {
    // Doing Optimistic delete, so not dispatching begin/end API call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteAuthorOptimistic(author));
    return authorApi.deleteAuthor(author.id);
  };
}

export function saveAuthor(author) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then(saveAuthor => {
        author.id
          ? dispatch(updateAuthorSuccess(saveAuthor))
          : dispatch(createAuthorSuccess(saveAuthor));
      })
      .catch(error => {
        // To handle error state in Redux Store
        dispatch(apiCallError());
        throw error;
      });
  };
}
