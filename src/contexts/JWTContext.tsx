import { createContext, ReactNode, useEffect, useReducer } from "react";

import axios from "../utils/axios";

// ----------------------------------------------------------------------
// Types

enum Types {
    Initial = "INITIALIZE",
    Login = "LOGIN",
    Logout = "LOGOUT",
    Register = "REGISTER",
}





const JWTReducer = (state, action) => {
    

}