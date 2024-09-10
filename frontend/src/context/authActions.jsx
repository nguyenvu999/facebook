// Login Actions
export const loginBegin = (userCredentials) => ({
    type: "LOGIN_BEGIN",
    payload: userCredentials,
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error, 
});

// Post Actions
export const postBegin = (postData) => ({
    type: "POST_BEGIN",
    payload: postData,
});

export const postSuccess = (post) => ({
    type: "POST_SUCCESS",
    payload: post, // post successfully
});

export const postFailure = (error) => ({
    type: "POST_FAILURE",
    payload: error,
});