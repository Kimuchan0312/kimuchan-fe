import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const initialState = {
  isInitialState: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case UPDATE_PROFILE:
      const { name, phoneNumber, email, aboutMe, role } = action.payload;

      return {
        ...state,
        user: { ...state.user, name, phoneNumber, email, aboutMe, role },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state?.user?.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem("accessToken");

      // Check if token exists and is valid
      if (isValidToken(accessToken)) {
        setSession(accessToken);
        
        // Optionally decode token to get user data
        const decoded = jwtDecode(accessToken);
      const user = decoded ? { userId: decoded.userId } : null;

        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        // Handle case when there is no token or token is invalid
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/api/v1/auth/login", {
      email,
      password,
    });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, accessToken },
    });
    toast.success("Login success");
    callback();
  };

  const register = async ({ name, phoneNumber, email, password }, callback) => {
    const response = await apiService.post("/api/v1/users", {
      name,
      email,
      phoneNumber,
      password,
    });

    const { user, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user, accessToken },
    });
    toast.success("Create new Account success");
    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    toast.success("Logout success");
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };