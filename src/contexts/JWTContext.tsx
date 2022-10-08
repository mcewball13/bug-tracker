import { createContext, ReactNode, useEffect, useReducer } from "react";

import axios from "../utils/axios";

// ----------------------------------------------------------------------
// Types

enum Actions {
    Initial = "INITIALIZE",
    Login = "LOGIN",
    Logout = "LOGOUT",
    Register = "REGISTER",
}

type AuthUser = Record<string, any> | null;

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
}






const JWTReducer = (state, action) => {
    

}