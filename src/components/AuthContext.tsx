import { createContext, useContext, useState, type ReactNode } from "react";


interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {
        isAuthenticated: false,
        login: (username: string, password: string) => { return false; },
        logout: () => {}
    }
);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({children} : AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(username: string, password: string) : boolean {
        if (username == "admin" && password == "admin") {
            setIsAuthenticated(true);
            return true;
        }

        let storedUser = localStorage.getItem("username");
        let storedPass = localStorage.getItem("password");
        if (storedUser == username && password == storedPass) {
            setIsAuthenticated(true);
            return true;
        }

        return false;
    }

    function logout() {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };