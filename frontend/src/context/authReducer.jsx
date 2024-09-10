const AuthReducer = (state, action) => {
  switch (action.type) {
      // Login Actions
      case "LOGIN_BEGIN":
          return { ...state, isFetching: true, error: false };
      case "LOGIN_SUCCESS":
          return { ...state, isFetching: false, user: action.payload };
      case "LOGIN_FAILURE":
          return { ...state, isFetching: false, error: action.payload };

      // Logout Actions
      case "LOGOUT_BEGIN":
          return { ...state, isFetching: true, error: false };
      case "LOGOUT_SUCCESS":
          return { ...state, isFetching: false, user: null };
      case "LOGOUT_FAILURE":
          return { ...state, isFetching: false, error: action.payload };

      // Post Actions
      case "POST_BEGIN":
          return { ...state, postFetching: true, postError: false };
      case "POST_SUCCESS":
          return { ...state, postFetching: false, post: action.payload };
      case "POST_FAILURE":
          return { ...state, postFetching: false, postError: action.payload };

      default:
          return state;
  }
};

export default AuthReducer;