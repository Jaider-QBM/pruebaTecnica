const API_URL = "http://localhost:5000/auth";

/**
 * Realiza una solicitud a la API
 * @param {string} endpoint - Ruta de la API (ej: "/login", "/register")
 * @param {string} method - Método HTTP (ej: "POST", "GET")
 * @param {object} body - Cuerpo de la petición (opcional)
 * @returns {Promise<object>} - Respuesta de la API
 */
const apiRequest = async (endpoint, method, body = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) throw new Error(data.error || "Ocurrió un error");

  return data;
};

/**
 * Inicia sesión del usuario
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Promise<{ token: string }>}
 */
export const login = async (email, password) => {
  const data = await apiRequest("/login", "POST", { email, password });
  setToken(data.token);
  return { token: data.token };
};

/**
 * Registra un nuevo usuario
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Promise<{ message: string }>}
 */
export const register = async (email, password) => {
  return await apiRequest("/register", "POST", { email, password });
};

/**
 * Obtiene el token almacenado en localStorage
 * @returns {string|null}
 */
export const getToken = () => localStorage.getItem("token");

/**
 * Almacena el token en localStorage
 * @param {string} token - Token de autenticación
 */
export const setToken = (token) => localStorage.setItem("token", token);

/**
 * Elimina el token del localStorage
 */
export const removeToken = () => localStorage.removeItem("token");
