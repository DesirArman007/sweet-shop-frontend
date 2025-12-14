import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import api from '../api/axios';

const AuthContext = createContext(null);

// HELPER: Robustly check for Admin role in different token fields
const checkIsAdmin = (decoded) => {
    // Debug: Log the token structure so you can see exactly what backend sent
    console.log("Decoded Token Claims:", decoded); 

    // 1. Check standard 'roles' array
    if (decoded.roles && Array.isArray(decoded.roles) && decoded.roles.includes('ROLE_ADMIN')) return true;

    // 2. Check 'authorities' array (Common in Spring Security)
    if (decoded.authorities && Array.isArray(decoded.authorities) && decoded.authorities.includes('ROLE_ADMIN')) return true;
    
    // 3. Check 'scope' string or array
    if (decoded.scope && (decoded.scope.includes('ROLE_ADMIN'))) return true;

    // 4. Check single 'role' field
    if (decoded.role === 'ROLE_ADMIN' || decoded.role === 'ADMIN') return true;

    return false;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ 
                    username: decoded.sub, 
                    // Use the helper to find roles/admin status
                    roles: decoded.roles || decoded.authorities || [], 
                    isAdmin: checkIsAdmin(decoded) 
                });
            } catch (e) {
                console.error("Invalid token found in storage");
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/api/auth/login', { email, password });
        
        // Grab 'accessToken' matching your Backend DTO
        const token = res.data.accessToken || res.data.token; 

        // Safety Check: Ensure token actually exists
        if (!token) {
            console.error("Login response missing accessToken:", res.data);
            throw new Error("Login failed: Server did not return a token.");
        }

        // Crash-proof storage (handles Incognito mode)
        try {
            localStorage.setItem('token', token);
        } catch (e) {
            console.warn("Could not save token to storage (Incognito mode?)");
        }
        
        const decoded = jwtDecode(token);
        setUser({ 
            username: decoded.sub, 
            roles: decoded.roles || decoded.authorities || [],
            isAdmin: checkIsAdmin(decoded)
        });
    };

    const register = async (userData) => {
        await api.post('/api/auth/register', userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);