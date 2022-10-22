import { useContext } from "react";

import { AuthContext } from "../contexts/JWTContext";

//==============================================================================

export default function useAuth() {
    const context = useContext(AuthContext);
    
    if (!context) throw new Error("Auth context must be used inside AuthProvider");

    return context;
    }

