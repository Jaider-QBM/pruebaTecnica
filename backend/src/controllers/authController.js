const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const validateEmail = require("../utils/validateEmail");
const validatePassword = require("../utils/validatePassword");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 📌 Verificar si faltan campos
    if (!email && !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    if (!email) {
      return res.status(400).json({ error: "El correo es requerido." });
    }
    if (!password) {
      return res.status(400).json({ error: "La contraseña es requerida." });
    }

    // 📌 Validar el formato del correo
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Correo electrónico no válido." });
    }

    // 📌 Validar la longitud de la contraseña
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }

    // 📌 Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya está registrado." });
    }

    // 📌 Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor. Inténtalo de nuevo más tarde." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 📌 Verificar si faltan campos
    if (!email && !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    if (!email) {
      return res.status(400).json({ error: "El correo es requerido." });
    }
    if (!password) {
      return res.status(400).json({ error: "La contraseña es requerida." });
    }

    // 📌 Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No tenemos registrado un usuario con este correo." });
    }

    // 📌 Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "La contraseña ingresada es incorrecta." });
    }

    // 📌 Devolver token si la autenticación es exitosa
    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor. Inténtalo de nuevo más tarde." });
  }
};

module.exports = { register, login };
