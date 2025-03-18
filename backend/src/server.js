require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ["https://prueba-tecnica-neon-chi.vercel.app", "http://localhost:5173"],
  methods: "POST",
  credentials: true
}));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

connectDB();

module.exports = app;

if (require.main === module) {
  app.listen(5000, () => console.log("🚀 Servidor corriendo en puerto 5000"));
}
