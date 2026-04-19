import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../utils/apiService';
import axios from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    lives?: number;
    score?: number;
    level?: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    register: (username: string, name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}
const api = axios.create({
    baseURL: 'http://localhost:5230/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string, rememberMe = false) => {
        try {
            const response = await api.post('/Player/login', {
                email,
                password
            });

            const data = response.data;

            const userData: User = {
                id: data.id,
                username: data.username,
                email: data.email,
            };

            setToken(data.token);
            setUser(userData);

            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('authToken', data.token);
            storage.setItem('authUser', JSON.stringify(userData));

        } catch (error: any) {
            if (error.response) {
                // O servidor respondeu com um erro (400, 401, 500)
                console.error('Erro do Servidor:', error.response.data);
                throw new Error(error.response.data.message || 'Erro no login');
            } else if (error.request) {
                // A requisição foi feita mas não houve resposta (CORS ou Servidor OFF)
                console.error('Erro de Rede/CORS: Sem resposta do servidor');
                throw new Error('Não foi possível conectar ao servidor. Verifique o CORS ou se a API está rodando.');
            } else {
                console.error('Erro inesperado:', error.message);
                throw error;
            }
        }
    };

    const register = async (username: string, name: string, email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/Player/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: username,
                    name,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            // After successful registration, automatically login
            await login(email, password, false);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authUser');
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);

            // Update stored user data
            const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            if (storedToken) {
                if (localStorage.getItem('authToken')) {
                    localStorage.setItem('authUser', JSON.stringify(updatedUser));
                } else {
                    sessionStorage.setItem('authUser', JSON.stringify(updatedUser));
                }
            }
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};