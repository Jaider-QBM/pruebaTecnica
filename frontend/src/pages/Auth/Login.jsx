import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, getToken } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import useValidation from "../../utils/validation"
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Loading} from "../../components/Loading";

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const { errors, validateLogin } = useValidation();
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateLogin(email, password)) return; 
    setLoading(true);

    try {
      const data = await login(email, password);
      setUser(data.token); 
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="">
      {loading ? (
        <Loading/>
      ) : (
        <div className="text-white  rounded-2xl drop-shadow-xl w-full p-8 md:w-xl md:p-14 md:border-2 md:bg-blue-950/50">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Iniciar sesión</h2>
            <p className="my-5 font-extralight">
            Introduce tus credenciales para acceder a tu cuenta. Si aún no tienes una, regístrate rápidamente y empieza a disfrutar de nuestros servicios.
            </p>
          </div>
          {error && 
            <p className="text-red-700 bg-red-200 p-2 border-4 rounded-lg my-3">
              {error}
            </p>
          }
          <form onSubmit={handleSubmit}>
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
              Iniciar Sesion
            </Button>
          </form>

          <p className="w-full text-end mt-2">
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-500 cursor-pointer"
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
