import { useState, useCallback } from "react";
import { getStoredUser, saveSession, clearSession } from "../utils/auth";
import { logoutUser } from "../utils/api";

export default function useAuth() {
  const [user, setUser] = useState(() => getStoredUser());

  const login = useCallback((token, userData) => {
    saveSession(token, userData);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // ignore network errors on logout
    }
    clearSession();
    setUser(null);
  }, []);

  return { user, login, logout };
}
