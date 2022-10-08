import { stringify } from "querystring";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { ActionMap, AuthUser } from "src/@types/auth";
import { isValidToken, setSession, decodeJWTUser } from "src/utils/jwt";

import axios from "../utils/axios";

// ----------------------------------------------------------------------
// Types

enum Actions {
    Initial = "INITIALIZE",
    Login = "LOGIN",
    Logout = "LOGOUT",
    Register = "REGISTER",
}

type JWTPayload = {
    [Actions.Initial]: {
        isAuthenticated: boolean;
        user: AuthUser;
    };
    [Actions.Login]: {
        user: AuthUser;
    };
    [Actions.Logout]: undefined;
    [Actions.Register]: {
        user: AuthUser;
    };
};

type ActionTypes = ActionMap<JWTPayload>[keyof ActionMap<JWTPayload>];

type AuthState = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: Record<string, any> | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const JWTReducer = (state: AuthState, action: ActionTypes) => {
    switch (action.type) {
        case "INITIALIZE":
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
            };
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case "REGISTER":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        default:
            return state;
    }
};

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer(JWTReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);

                    const userId = decodeJWTUser(accessToken);
                    // TODO - get user from backend
                    const response = await axios.get(
                        `api/account/my-account/${userId}`
                    );

                    const { user } = response.data;

                    dispatch({
                        type: Actions.Initial,
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    });
                } else {
                    dispatch({
                        type: Actions.Initial,
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: Actions.Initial,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };
        init();
    }, []);

    const login = async (username: string, password: string) => {
        const response = await axios.post("api/account/login", {
            username,
            password,
        });
        const { accessToken, user } = response.data;

        setSession(accessToken);

        dispatch({
            type: Actions.Login,
            payload: {
                user,
            },
        });
    };
}
