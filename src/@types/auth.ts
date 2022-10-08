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



export type AuthUser = Record<string, any> | null;
