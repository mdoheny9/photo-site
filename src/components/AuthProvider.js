import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return sessionStorage.getItem('token') || null;
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { // saves token to session storage
        if (token) {
            sessionStorage.setItem('token', token);
        } else {
            sessionStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);

    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value = {{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );  
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};