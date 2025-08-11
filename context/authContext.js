import { createContext, useContext, useState, useEffect } from "react";
import checkAuth from "../app/actions/checkAuth";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const fetchAuth = async () => {
            const {isAuthenticated, user} = await checkAuth();
            setIsAuthenticated(isAuthenticated);
            setUser(user);
        };
        fetchAuth();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}   

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

