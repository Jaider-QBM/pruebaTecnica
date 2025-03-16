import { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token }); // 🔹 Usuario autenticado si hay token
    }
    setLoading(false);
  }, []);

  const loginUser = (token) => {
    setToken(token);
    setUser({ token });
  };

  const logoutUser = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: loginUser, logout: logoutUser }}>
      {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
