export type AuthState = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: Record<string, any> | null;
};
