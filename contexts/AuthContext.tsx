import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storedUser = await AsyncStorage.getItem("@user");
            if (storedUser) setUser(JSON.parse(storedUser));
            setLoading(false);
        })();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/api/auth/login", { email, password });
            const { token, user } = response.data;
            const loggedUser = {
                id: user.id,
                email: user.email
            };

            await AsyncStorage.setItem("@token", token);
            await AsyncStorage.setItem("@user", JSON.stringify(loggedUser));

            setUser(loggedUser);
            router.replace("/tasks" as never);

        } catch (error) {
            console.log("Erro no Login:", error);
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        await api.post("/api/users", { email, password });
    };

    const logout = async () => {
        await AsyncStorage.multiRemove(["@token", "@user"]);
        setUser(null);
        router.replace("/tasks" as never);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
