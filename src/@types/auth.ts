export type ActionMap<M extends Record<string, any>> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export type JWTContextType = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUser | null;
    method: 'jwt';

    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
}

export type AuthUser = Record<string, any> | null;
