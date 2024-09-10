import axios from "axios";

// Call API to sign in
export const callLogin = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_BEGIN" });
    try {
        const res = await axios.post("/auth/sign-in", userCredential, { withCredentials: true });
        if (res.data.success) {
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
        }
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message || err.message });
    }
};

// Call API to sign out
export const callLogout = async (dispatch) => {
    dispatch({ type: "LOGOUT_BEGIN" });
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      sessionStorage.removeItem("user"); 
      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (err) {
      dispatch({ type: "LOGOUT_FAILURE", payload: err.message });
      console.error('Logout error:', err);
    }
  };

// Call API to create a post
export const callCreatePost = async (postData, dispatch) => {
    dispatch({ type: "POST_BEGIN" });
    try {
        const res = await axios.post("/posts/create-post", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch({ type: "POST_SUCCESS", payload: res.data.post });
        } else {
            dispatch({ type: "POST_FAILURE", payload: res.data.message });
        }
    } catch (err) {
        dispatch({ type: "POST_FAILURE", payload: err.response?.data?.message || err.message });
    }
};