import {
  GET_POSTS,
  POST_ERROR
  // UPDATE_LIKES,
  // DELETE_POST,
  // ADD_POST,
  // GET_POST,
  // ADD_COMMENT,
  // REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
