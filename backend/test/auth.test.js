const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/server");
const User = require("../src/models/User");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("🔹 Auth API Tests", () => {
  const testUser = { email: "test@examplez.com", password: "123456" };

  it("✅ Debería registrar un usuario correctamente", async () => {
    const res = await request(app).post("/auth/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Usuario registrado exitosamente");
  });

  it("✅ Debería iniciar sesión correctamente y devolver un token válido", async () => {
    const res = await request(app).post("/auth/login").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    // ✅ Verificar que el token es válido
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty("id");
  });

  // 📌 Nuevo test: Falta el email
  it("❌ No debería registrar si falta el correo", async () => {
    const res = await request(app).post("/auth/register").send({ password: "123456" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "El correo es requerido");
  });

  // 📌 Nuevo test: Falta la contraseña
  it("❌ No debería registrar si falta la contraseña", async () => {
    const res = await request(app).post("/auth/register").send({ email: "test@example.com" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "La contraseña es requerida");
  });

  // 📌 Nuevo test: Faltan ambos campos
  it("❌ No debería registrar si faltan todos los campos", async () => {
    const res = await request(app).post("/auth/register").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Todos los campos son obligatorios");
  });

  // 📌 Nuevo test: Email inválido
  it("❌ No debería registrar un usuario con email inválido", async () => {
    const res = await request(app).post("/auth/register").send({ email: "bademail", password: "123456" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Correo electrónico no válido");
  });

  // 📌 Nuevo test: Contraseña corta
  it("❌ No debería registrar un usuario con contraseña corta", async () => {
    const res = await request(app).post("/auth/register").send({ email: "valid@example.com", password: "123" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "La contraseña debe tener al menos 6 caracteres");
  });

  // 📌 Nuevo test: Usuario no registrado
  it("❌ No debería permitir iniciar sesión con un usuario no registrado", async () => {
    const res = await request(app).post("/auth/login").send({ email: "noexiste@example.com", password: "123456" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Credenciales incorrectas");
  });

  // 📌 Nuevo test: Usuario registrado pero con contraseña incorrecta
  it("❌ No debería permitir iniciar sesión con una contraseña incorrecta", async () => {
    const res = await request(app).post("/auth/login").send({ email: testUser.email, password: "wrongpass" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Credenciales incorrectas");
  });
});
