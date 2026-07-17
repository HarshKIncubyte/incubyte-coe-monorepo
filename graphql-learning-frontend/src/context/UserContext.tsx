import {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { User } from "../types/user";

// Only expose what components are ALLOWED to do
type UserContextType = {
  user: User;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
};

// Not exported — consumers must use useUser() hook
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Harsh",
    email: "harsh@example.com",
  });

  // Controlled actions — components can't corrupt state directly
  const updateName = (name: string) =>
    setUser((prev) => ({ ...prev, name }));

  const updateEmail = (email: string) =>
    setUser((prev) => ({ ...prev, email }));

  return (
    <UserContext.Provider value={{ user, updateName, updateEmail }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook — null check lives here once, not in every component
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
