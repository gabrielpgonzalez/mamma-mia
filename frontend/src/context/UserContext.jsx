import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authLogin, authRegister, authMe } from "../utils/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  useEffect(() => {
    const check = async () => {
      if (!token) return;
      try {
        setLoading(true);
        setError("");
        await authMe(token);
      } catch {
        setToken("");
        setEmail("");
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const data = await authLogin({ email, password });
      setToken(data.token || "");
      setEmail(data.email || email || "");
      return { ok: true };
    } catch (e) {
      setError(e.message || "Error de autenticación");
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password, name }) => {
    setLoading(true);
    setError("");
    try {
      const data = await authRegister({ email, password, name });
      setToken(data.token || "");
      setEmail(data.email || email || "");
      return { ok: true };
    } catch (e) {
      setError(e.message || "Error de registro");
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const me = async () => {
    if (!token) throw new Error("Sin token");
    return authMe(token);
  };

  const logout = () => {
    setToken("");
    setEmail("");
    setError("");
  };

  const value = useMemo(
    () => ({ token, email, loading, error, login, register, me, logout }),
    [token, email, loading, error]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
