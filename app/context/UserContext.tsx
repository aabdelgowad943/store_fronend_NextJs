// context/UserContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type UserRole = "ADMIN" | "SELLER" | "BUYER" | null;

interface UserContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    // Simulate role fetch (replace this with API call or real auth logic)
    const storedRole = localStorage.getItem("role");
    setRole(storedRole as UserRole);
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};
