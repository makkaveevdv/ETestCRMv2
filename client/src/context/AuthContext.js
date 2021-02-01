import { createContext } from 'react';

function noop() { };

export const AuthContext = createContext({
    token: null,
    personId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    respPersonsList: []
});