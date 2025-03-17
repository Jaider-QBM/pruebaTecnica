import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getToken } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const Login = ({ setIsLogin }) => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data.token);
  };

  const redirect = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <AuthForm
      title="Iniciar sesión"
      description="Introduce tus credenciales para acceder a tu cuenta. Si aún no tienes una, regístrate rápidamente y empieza a disfrutar de nuestros servicios."
      submitText="Iniciar Sesión"
      imageOrder="order-1"
      onSubmit={handleLogin}
      isLogin={true}
      setIsLogin={setIsLogin}
      redirect={redirect}
    />
  );
};

export default Login;