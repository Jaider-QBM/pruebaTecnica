import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import useValidation from "../../utils/validation";
import {Loading} from "../../components/Loading";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Register({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, validateLogin } = useValidation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateLogin(email, password)) return; 
    setLoading(true);

    try {
      await register(email, password);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="">
      {loading ? (
        <Loading/>
      ) : (
        <div className="text-white  rounded-2xl drop-shadow-xl w-full p-8 md:w-xl md:p-14 md:border-2 md:bg-blue-950/50">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Crea tu cuenta</h2>
            <p className="my-5 font-extralight">
            Regístrate para empezar a disfrutar de todos nuestros beneficios. Solo toma unos minutos y tendrás acceso completo a nuestra plataforma.</p>
          </div>
          { error && 
            <p className="text-red-700 bg-red-200 p-2 border-4 rounded-lg my-3">
              {error}
            </p>
          }
          <form onSubmit={handleRegister}>
          <Input
              type={'email'}
              label='Correo Electronico'
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              type={'password'}
              label='Contraseña'
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Button type="submit" disabled={loading}>
              Registrar usuario
            </Button>
          </form>

          <p className="w-full text-end mt-2">
            ¿Ya tienes cuenta?{" "}
            <span
              onClick={() => setIsLogin(true)}
              className="text-blue-500 cursor-pointer"
            >
              Inicia sesión aquí
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
