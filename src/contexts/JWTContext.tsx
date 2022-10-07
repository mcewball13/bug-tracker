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
type JWTPayload {
    
}




const JWTReducer = (state, action) => {
    

}