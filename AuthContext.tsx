//contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      referralCode: "ABC123",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const signup = async (name: string, email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser: User = {
      id: "1",
      name: name,
      email: email,
      referralCode: Math.random().toString(36).substring(7),
      avatarUrl: "/placeholder.svg?height=32&width=32",
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatarUrl };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
