import React from "react";
import { register } from "../../services/authService";
import AuthForm from "../../components/AuthForm";

export default function Register({ setIsLogin }) {
  const handleRegister = async (email, password) => {
    await register(email, password);
  };

  const redirect = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <AuthForm
      title="Crea tu cuenta"
      description="Regístrate para empezar a disfrutar de todos nuestros beneficios. Solo toma unos minutos y tendrás acceso completo a nuestra plataforma."
      submitText="Registrar usuario"
      imageOrder=""
      onSubmit={handleRegister}
      isLogin={false}
      setIsLogin={setIsLogin}
      redirect={redirect}
    />
  );
}