const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;