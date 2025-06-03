import { type Admin, type AuthContextType, type User } from "constant";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthService from "../lib/AuthService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);

      const user = await AuthService.getUser();
      // console.log("Fetched user:", user); // cek isi user
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user) || "");
    } catch (error) {
      // console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdmin = async () => {
    try {
      setIsLoadingAdmin(true);

      const admin = await AuthService.getAdmin();
      console.log("Fetch Admin:", admin);

      setAdmin(admin);
      localStorage.setItem("admin", JSON.stringify(admin) || "");
    } catch (error) {
      // console.error("Failed to fetch admin:", error);
      setAdmin(null);
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  useEffect(() => {
    fetchUser(); // ambil user saat awal load (jika sudah login via cookie)
    fetchAdmin();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await AuthService.loginUser(email, password);
      await fetchUser();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logoutUser();
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<void> => {
    setIsLoadingAdmin(true);

    try {
      await AuthService.loginAdmin(email, password);
      await fetchAdmin();
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  const logoutAdmin = async () => {
    setIsLoadingAdmin(true);
    try {
      await AuthService.logoutAdmin();
      setAdmin(null);
      localStorage.removeItem("admin");
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isLoading,
        isLoadingAdmin,
        login,
        loginAdmin,
        logout,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
