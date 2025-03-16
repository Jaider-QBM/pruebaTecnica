import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {Loading} from "../components/Loading";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate("/");
    }, 1500); // 🔹 Simular un "Cerrando sesión..."
  };

  return (
    <div>
      <h2>Bienvenido, {user?.email}</h2>
      {loading ?  <Loading/> : <button onClick={handleLogout}>Cerrar sesión</button>}
    </div>
  );
};

export default Dashboard;
