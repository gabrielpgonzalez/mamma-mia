// src/context/UserContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true);

  const login = () => setToken(true);
  const logout = () => setToken(false);

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
